import { pool } from '#/app'
import { CategoryRaw } from '#/types/database'
import uniqueKey from '#/utils/uniqueKey'
import { Category, CategoryBody } from '$/types'
import { DictionaryService } from './dictionary.service'
import { ImageService } from './image.service'

export class CategoryService {
  private dictionaryService: DictionaryService
  private imageService: ImageService

  constructor(dictionaryService: DictionaryService, imageService: ImageService) {
    this.dictionaryService = dictionaryService
    this.imageService = imageService
  }

  async findAll() {
    const result = await pool.query<Category>(
      `--sql
        SELECT
            c.id,
            jsonb_build_object(
                'fr', d_name_fr.translation,
                'en', d_name_en.translation
            ) AS name,
            jsonb_build_object(
                'fr', d_description_fr.translation,
                'en', d_description_en.translation
            ) AS description,
            jsonb_build_array(c.image) AS image,
            c."index"
        FROM category c

        LEFT JOIN dictionary d_name_fr
            ON d_name_fr.key = c.name_key AND d_name_fr.lang = 'fr'
        LEFT JOIN dictionary d_name_en
            ON d_name_en.key = c.name_key AND d_name_en.lang = 'en'

        LEFT JOIN dictionary d_description_fr
            ON d_description_fr.key = c.description_key AND d_description_fr.lang = 'fr'
        LEFT JOIN dictionary d_description_en
            ON d_description_en.key = c.description_key AND d_description_en.lang = 'en'

        ORDER BY c."index" ASC;
      `,
    )

    return result.rows
  }

  async findById(id: number) {
    const result = await pool.query<Category>(
      `--sql
      SELECT
          c.id,
          jsonb_build_object(
              'fr', d_name_fr.translation,
              'en', d_name_en.translation
          ) AS name,
          jsonb_build_object(
              'fr', d_description_fr.translation,
              'en', d_description_en.translation
          ) AS description,
          jsonb_build_array(c.image) AS image,
          c."index"
      FROM category c

      LEFT JOIN dictionary d_name_fr
          ON d_name_fr.key = c.name_key AND d_name_fr.lang = 'fr'
      LEFT JOIN dictionary d_name_en
          ON d_name_en.key = c.name_key AND d_name_en.lang = 'en'

      LEFT JOIN dictionary d_description_fr
          ON d_description_fr.key = c.description_key AND d_description_fr.lang = 'fr'
      LEFT JOIN dictionary d_description_en
          ON d_description_en.key = c.description_key AND d_description_en.lang = 'en'

      WHERE c.id = $1;
    `,
      [id],
    )

    return result.rows[0] ?? null
  }

  async create(body: CategoryBody) {
    const nameKey = uniqueKey('category', 'name')
    const descriptionKey = uniqueKey('category', 'description')

    const maxResult = await pool.query<{ max: number }>(`SELECT MAX("index") AS max FROM category`)
    const nextIndex = (maxResult.rows[0].max ?? 0) + 1

    await pool.query(
      `--sql
        INSERT INTO category (name_key, description_key, image, "index")
        VALUES ($1, $2, $3, $4);
      `,
      [nameKey, descriptionKey, body.image[0], nextIndex],
    )

    await this.dictionaryService.create({
      key: nameKey,
      en: body.name_en,
      fr: body.name_fr,
    })

    await this.dictionaryService.create({
      key: descriptionKey,
      en: body.description_en,
      fr: body.description_fr,
    })
  }

  async update(id: number, body: CategoryBody, replaceImage: boolean) {
    const result = await pool.query<CategoryRaw>(
      `--sql
        SELECT * FROM category WHERE id = $1
      `,
      [id],
    )
    const category = result.rows[0]

    if (replaceImage) this.imageService.delete(category.image)

    await pool.query(
      `--sql
        UPDATE category
        SET image = $2
        WHERE id = $1
      `,
      [id, body.image[0]],
    )

    await this.dictionaryService.update({
      key: category.name_key,
      en: body.name_en,
      fr: body.name_fr,
    })

    await this.dictionaryService.update({
      key: category.description_key,
      en: body.description_en,
      fr: body.description_fr,
    })
  }

  async delete(id: number) {
    const result = await pool.query<CategoryRaw>(
      `--sql
        SELECT * FROM category WHERE id = $1
      `,
      [id],
    )
    const category = result.rows[0]

    this.imageService.delete(category.image)

    await pool.query(
      `--sql
        DELETE FROM category
        WHERE id = $1
      `,
      [id],
    )

    await this.dictionaryService.delete(category.name_key)
    await this.dictionaryService.delete(category.description_key)
  }

  async reorder(ids: number[]) {
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i]
      await pool.query(
        `--sql
          UPDATE category
          SET "index" = $2
          WHERE id = $1
        `,
        [id, i],
      )
    }
  }
}
