import { pool } from '#/app'
import { CharacteristicRaw } from '#/types/database'
import uniqueKey from '#/utils/uniqueKey'
import { Characteristic, CharacteristicType } from '$/types'
import { DictionaryService } from './dictionary.service'

export class CharacteristicService {
  private dictionaryService: DictionaryService

  constructor(dictionaryService: DictionaryService) {
    this.dictionaryService = dictionaryService
  }

  async findAll() {
    const result = await pool.query<Characteristic>(
      `--sql
        SELECT
          c.id,
          c.type,
          jsonb_build_object(
            'fr', d_name_fr.translation,
            'en', d_name_en.translation
          ) AS name
        FROM characteristic c

        LEFT JOIN dictionary d_name_fr
          ON d_name_fr.key = c.name_key AND d_name_fr.lang = 'fr'
        LEFT JOIN dictionary d_name_en
          ON d_name_en.key = c.name_key AND d_name_en.lang = 'en'
      `,
    )

    return result.rows
  }

  async findByIds(ids: number[]) {
    const result = await pool.query<Characteristic>(
      `--sql
        SELECT
          c.id,
          c.type,
          jsonb_build_object(
            'fr', d_name_fr.translation,
            'en', d_name_en.translation
          ) AS name
        FROM characteristic c

        LEFT JOIN dictionary d_name_fr
          ON d_name_fr.key = c.name_key AND d_name_fr.lang = 'fr'
        LEFT JOIN dictionary d_name_en
          ON d_name_en.key = c.name_key AND d_name_en.lang = 'en'

        WHERE c.id = ANY($1);
      `,
      [ids],
    )

    return result.rows
  }

  async findByType(type: CharacteristicType) {
    const result = await pool.query<Characteristic>(
      `--sql
      SELECT
        c.id,
        c.type,
        jsonb_build_object(
          'fr', d_name_fr.translation,
          'en', d_name_en.translation
        ) AS name
      FROM characteristic c

      LEFT JOIN dictionary d_name_fr
        ON d_name_fr.key = c.name_key AND d_name_fr.lang = 'fr'
      LEFT JOIN dictionary d_name_en
        ON d_name_en.key = c.name_key AND d_name_en.lang = 'en'

      WHERE c.type = $1;
    `,
      [type],
    )

    return result.rows
  }

  async create(body: { name_en: string; name_fr: string; type: CharacteristicType }) {
    const nameKey = uniqueKey('characteristic', 'name')

    const result = await pool.query<{ id: number }>(
      `--sql
      INSERT INTO characteristic (name_key, type)
      VALUES ($1, $2)
      RETURNING id;
    `,
      [nameKey, body.type],
    )

    await this.dictionaryService.create({
      key: nameKey,
      en: body.name_en,
      fr: body.name_fr,
    })

    return result.rows[0]
  }

  async update(id: number, body: { name_en: string; name_fr: string; type: CharacteristicType }) {
    const result = await pool.query<CharacteristicRaw>(
      `--sql
        SELECT * FROM characteristic WHERE id = $1
      `,
      [id],
    )
    const characteristic = result.rows[0]

    await pool.query(
      `--sql
        UPDATE characteristic
        SET type = $2
        WHERE id = $1
      `,
      [id, body.type],
    )

    await this.dictionaryService.update({
      key: characteristic.name_key,
      en: body.name_en,
      fr: body.name_fr,
    })
  }

  async delete(id: number) {
    const result = await pool.query<CharacteristicRaw>(
      `--sql
        SELECT * FROM characteristic WHERE id = $1
      `,
      [id],
    )
    const characteristic = result.rows[0]

    await pool.query(
      `--sql
        DELETE FROM characteristic
        WHERE id = $1
      `,
      [id],
    )

    await this.dictionaryService.delete(characteristic.name_key)
  }
}
