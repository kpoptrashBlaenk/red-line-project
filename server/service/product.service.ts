import { pool } from '#/app'
import { ProductImageRaw, ProductRaw } from '#/types/database'
import uniqueKey from '#/utils/uniqueKey'
import { CharacteristicType, Product } from '$/types'
import { ProductBody } from './../../shared/types/apiBody'
import { DictionaryService } from './dictionary.service'
import { ImageService } from './image.service'

export class ProductService {
  private dictionaryService: DictionaryService
  private imageService: ImageService

  constructor() {
    this.dictionaryService = new DictionaryService()
    this.imageService = new ImageService()
  }

  private baseSelect = `--sql
SELECT
  p.id,
  p.top,
  p.priority,
  p.price,
  p.disponible,
  p."index",

  jsonb_build_object(
    'id', c.id
  ) as category,

  jsonb_build_object(
    'fr', d_name_fr.translation,
    'en', d_name_en.translation
  ) AS name,

  jsonb_build_object(
    'fr', d_df_fr.translation,
    'en', d_df_en.translation
  ) AS description_functionality,

  jsonb_build_object(
    'fr', d_da_fr.translation,
    'en', d_da_en.translation
  ) AS description_advantage,

  jsonb_build_object(
    'fr', d_ds_fr.translation,
    'en', d_ds_en.translation
  ) AS description_security,

  COALESCE(
    json_agg(pi.image ORDER BY pi.first DESC) FILTER (WHERE pi.id IS NOT NULL),
    '[]'
  ) AS image

FROM product p

LEFT JOIN category c ON c.id = p.category_id

LEFT JOIN product_image pi ON pi.product_id = p.id

LEFT JOIN dictionary d_name_fr ON d_name_fr.key = p.name_key AND d_name_fr.lang = 'fr'
LEFT JOIN dictionary d_name_en ON d_name_en.key = p.name_key AND d_name_en.lang = 'en'

LEFT JOIN dictionary d_df_fr ON d_df_fr.key = p.description_functionality_key AND d_df_fr.lang = 'fr'
LEFT JOIN dictionary d_df_en ON d_df_en.key = p.description_functionality_key AND d_df_en.lang = 'en'

LEFT JOIN dictionary d_da_fr ON d_da_fr.key = p.description_advantage_key AND d_da_fr.lang = 'fr'
LEFT JOIN dictionary d_da_en ON d_da_en.key = p.description_advantage_key AND d_da_en.lang = 'en'

LEFT JOIN dictionary d_ds_fr ON d_ds_fr.key = p.description_security_key AND d_ds_fr.lang = 'fr'
LEFT JOIN dictionary d_ds_en ON d_ds_en.key = p.description_security_key AND d_ds_en.lang = 'en'

GROUP BY
  p.id,
  c.id,
  d_name_fr.translation,
  d_name_en.translation,
  d_df_fr.translation,
  d_df_en.translation,
  d_da_fr.translation,
  d_da_en.translation,
  d_ds_fr.translation,
  d_ds_en.translation
  `

  private async attachCharacteristics(products: Product[]) {
    if (!products.length) return products

    const ids = products.map((p) => p.id)

    const result = await pool.query(
      `--sql
        SELECT
          pc.product_id,
          c.id,
          c.type,
          jsonb_build_object(
            'fr', d_fr.translation,
            'en', d_en.translation
          ) AS name
        FROM product_characteristic pc
        JOIN characteristic c ON c.id = pc.characteristic_id

        LEFT JOIN dictionary d_fr ON d_fr.key = c.name_key AND d_fr.lang = 'fr'
        LEFT JOIN dictionary d_en ON d_en.key = c.name_key AND d_en.lang = 'en'

        WHERE pc.product_id = ANY($1)
      `,
      [ids],
    )

    const map = new Map<number, Product>()

    products.forEach((p) => {
      p.characteristics_performance = []
      p.characteristics_scalability = []
      p.characteristics_level = []
      map.set(p.id, p)
    })

    result.rows.forEach((row: any) => {
      const product = map.get(row.product_id)
      if (!product) return

      if (row.type === CharacteristicType.performance) {
        product.characteristics_performance.push(row)
      } else if (row.type === CharacteristicType.scalability) {
        product.characteristics_scalability.push(row)
      } else if (row.type === CharacteristicType.level) {
        product.characteristics_level.push(row)
      }
    })

    return products
  }

  async findAll() {
    const result = await pool.query<Product>(`${this.baseSelect} ORDER BY p."index" ASC`)

    return await this.attachCharacteristics(result.rows)
  }

  async findByCategory(categoryId: number) {
    const result = await this.findAll()

    return await this.attachCharacteristics(result.filter((product) => product.category.id === categoryId))
  }

  async findTop() {
    const result = await this.findAll()

    return await this.attachCharacteristics(result.filter((product) => product.top))
  }

  async findById(id: number) {
    const result = await this.findAll()

    return await this.attachCharacteristics(result.filter((product) => product.id === id))
  }

  async create(body: ProductBody) {
    const nameKey = uniqueKey('product', 'name')
    const dfKey = uniqueKey('product', 'df')
    const daKey = uniqueKey('product', 'da')
    const dsKey = uniqueKey('product', 'ds')

    const maxResult = await pool.query<{ max: number }>(`SELECT MAX("index") AS max FROM product`)
    const nextIndex = (maxResult.rows[0].max ?? 0) + 1

    const result = await pool.query<{ id: number }>(
      `--sql
        INSERT INTO product (
          category_id,
          name_key,
          description_functionality_key,
          description_advantage_key,
          description_security_key,
          top,
          priority,
          price,
          disponible,
          "index"
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING id;
      `,
      [body.category_id, nameKey, dfKey, daKey, dsKey, body.top, body.priority, body.price, body.disponible, nextIndex],
    )

    const productId = result.rows[0].id

    // dictionary
    await this.dictionaryService.create({
      key: nameKey,
      en: body.name_en,
      fr: body.name_fr,
    })

    await this.dictionaryService.create({
      key: dfKey,
      en: body.description_functionality_en,
      fr: body.description_functionality_fr,
    })

    await this.dictionaryService.create({
      key: daKey,
      en: body.description_advantage_en,
      fr: body.description_advantage_fr,
    })

    await this.dictionaryService.create({
      key: dsKey,
      en: body.description_security_en,
      fr: body.description_security_fr,
    })

    // characteristics
    await this.insertCharacteristics(productId, body)

    // images
    await this.insertImages(productId, body.image)

    return { id: productId }
  }

  private async insertCharacteristics(productId: number, body: ProductBody) {
    const allIds = [
      ...this.toNumberArray(body.characteristics_performance_ids),
      ...this.toNumberArray(body.characteristics_scalability_ids),
      ...this.toNumberArray(body.characteristics_level_ids),
    ]

    allIds.forEach(async (id) => {
      await pool.query(
        `INSERT INTO product_characteristic (product_id, characteristic_id)
         VALUES ($1, $2)`,
        [productId, id],
      )
    })
  }

  private async insertImages(productId: number, images: string[]) {
    images.forEach(async (image, index) => {
      await pool.query(
        `INSERT INTO product_image (product_id, image, first)
         VALUES ($1, $2, $3)`,
        [productId, image, index === 0],
      )
    })
  }

  async update(id: number, body: ProductBody, multerImages: string[]) {
    // get product
    const result = await pool.query<ProductRaw>(`SELECT * FROM product WHERE id = $1`, [id])
    const product = result.rows[0]

    // get images
    const images = await pool.query<ProductImageRaw>(`SELECT * FROM product_image WHERE product_id = $1`, [id])

    // delete removed images
    images.rows.forEach(async (image) => {
      await pool.query(`DELETE FROM product_image WHERE image = $1`, [image.image])

      if (!body.image.includes(image.image)) {
        this.imageService.delete(image.image)
      }
    })

    // update
    await pool.query(
      `--sql
        UPDATE product
        SET
          category_id = $2,
          top = $3,
          priority = $4,
          price = $5,
          disponible = $6
        WHERE id = $1
      `,
      [id, body.category_id, body.top, body.priority, body.price, body.disponible],
    )

    // image updates
    const existingImages = body.image === undefined ? [] : Array.isArray(body.image) ? body.image : [body.image]
    await this.insertImages(
      id,
      body.first === 'body' ? [...existingImages, ...multerImages] : [...multerImages, ...existingImages],
    )

    // dictionary updates
    await this.dictionaryService.update({
      key: product.name_key,
      en: body.name_en,
      fr: body.name_fr,
    })

    await this.dictionaryService.update({
      key: product.description_functionality_key,
      en: body.description_functionality_en,
      fr: body.description_functionality_fr,
    })

    await this.dictionaryService.update({
      key: product.description_advantage_key,
      en: body.description_advantage_en,
      fr: body.description_advantage_fr,
    })

    await this.dictionaryService.update({
      key: product.description_security_key,
      en: body.description_security_en,
      fr: body.description_security_fr,
    })

    // replace characteristics
    await pool.query(`DELETE FROM product_characteristic WHERE product_id = $1`, [id])
    await this.insertCharacteristics(id, body)
  }

  async delete(id: number) {
    // get product
    const result = await pool.query<ProductRaw>(`SELECT * FROM product WHERE id = $1`, [id])
    const product = result.rows[0]

    // get images
    const images = await pool.query<ProductImageRaw>(`SELECT * FROM product_image WHERE product_id = $1`, [id])

    // delete
    await pool.query(`DELETE FROM product WHERE id = $1`, [id])
    await pool.query(`DELETE FROM product_characteristic WHERE product_id = $1`, [id])
    await pool.query(`DELETE FROM product_image WHERE product_id = $1`, [id])
    images.rows.forEach(async (image) => this.imageService.delete(image.image))

    await this.dictionaryService.delete(product.name_key)
    await this.dictionaryService.delete(product.description_functionality_key)
    await this.dictionaryService.delete(product.description_advantage_key)
    await this.dictionaryService.delete(product.description_security_key)
  }

  async reorder(ids: number[]) {
    for (let i = 0; i < ids.length; i++) {
      await pool.query(`UPDATE product SET "index" = $2 WHERE id = $1`, [ids[i], i])
    }
  }

  private toNumberArray(input?: number | number[]): number[] {
    if (input === undefined) return []
    return Array.isArray(input) ? input : [input]
  }
}
