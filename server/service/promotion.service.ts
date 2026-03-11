import { pool } from '#/app'
import { PromotionRaw } from '#/types/database'
import uniqueKey from '#/utils/uniqueKey'
import { Promotion, PromotionBody } from '$/types'
import { DictionaryService } from './dictionary.service'

export class PromotionService {
  private dictionaryService: DictionaryService

  constructor() {
    this.dictionaryService = new DictionaryService()
  }

  async findAll() {
    const result = await pool.query<Promotion>(`--sql
        SELECT
            p.id,
            jsonb_build_object(
                'fr', d_title_fr.translation,
                'en', d_title_en.translation
            ) AS title,
            jsonb_build_object(
                'fr', d_subtitle_fr.translation,
                'en', d_subtitle_en.translation
            ) AS subtitle,
            jsonb_build_object(
                'fr', d_button_fr.translation,
                'en', d_button_en.translation
            ) AS button,
            p.link,
            jsonb_build_array(p.image) AS image
        FROM promotion p

        LEFT JOIN dictionary d_title_fr
            ON d_title_fr.key = p.title_key AND d_title_fr.lang = 'fr'
        LEFT JOIN dictionary d_title_en
            ON d_title_en.key = p.title_key AND d_title_en.lang = 'en'

        LEFT JOIN dictionary d_subtitle_fr
            ON d_subtitle_fr.key = p.subtitle_key AND d_subtitle_fr.lang = 'fr'
        LEFT JOIN dictionary d_subtitle_en
            ON d_subtitle_en.key = p.subtitle_key AND d_subtitle_en.lang = 'en'

        LEFT JOIN dictionary d_button_fr
            ON d_button_fr.key = p.button_key AND d_button_fr.lang = 'fr'
        LEFT JOIN dictionary d_button_en
            ON d_button_en.key = p.button_key AND d_button_en.lang = 'en'
    `)

    return result.rows
  }

  async create(body: PromotionBody) {
    // create unique keys
    const titleKey = uniqueKey('promotion', 'title')
    const subtitleKey = uniqueKey('promotion', 'subtitle')
    const buttonKey = uniqueKey('promotion', 'button')

    // create promotion
    await pool.query(
      `--sql
        INSERT INTO promotion (title_key, subtitle_key, button_key, link, image)
        VALUES ($1, $2, $3, $4, $5);
        `,
      [
        titleKey, // $1
        subtitleKey, // $2
        buttonKey, // $3
        body.link, // $4
        body.image, // $5
      ],
    )

    // create translations
    await this.dictionaryService.create({
      key: titleKey,
      en: body.title_en,
      fr: body.title_fr,
    })

    await this.dictionaryService.create({
      key: subtitleKey,
      en: body.subtitle_en,
      fr: body.subtitle_fr,
    })

    await this.dictionaryService.create({
      key: buttonKey,
      en: body.button_en,
      fr: body.button_fr,
    })
  }

  async update(id: number, body: PromotionBody) {
    // find promotion for keys
    const result = await pool.query<PromotionRaw>(
      `--sql
        SELECT * FROM promotion WHERE id = $1
        `,
      [id],
    )
    const promotion = result.rows[0]

    // update promotion
    await pool.query(
      `--sql
        UPDATE promotion
        SET link = $2, image = $3
        WHERE id = $1
        `,
      [id, body.link, body.image],
    )

    // update dictionary
    await this.dictionaryService.update({ key: promotion.title_key, en: body.title_en, fr: body.title_fr })
    await this.dictionaryService.update({ key: promotion.subtitle_key, en: body.subtitle_en, fr: body.subtitle_fr })
    await this.dictionaryService.update({ key: promotion.button_key, en: body.button_en, fr: body.button_fr })
  }
}
