import { pool } from '#/app'
import uniqueKey from '#/utils/uniqueKey'
import { Promotion, PromotionBody } from '$/types'

export class PromotionService {
  constructor() {}

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
            p.image
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
    const titleKey = uniqueKey('promotion', 'title')
    const subtitleKey = uniqueKey('promotion', 'subtitle')
    const buttonKey = uniqueKey('promotion', 'button')

    await pool.query(
      `--sql
        INSERT INTO promotion (title_key, subtitle_key, button_key, link, image)
        VALUES ($1, $2, $3, $4, $5)

        INSERT INTO dictionary (key, lang, translation)
        VALUES ($1, 'en', $6), ($1, 'fr', $7)

        INSERT INTO dictionary (key, lang, translation)
        VALUES ($2, 'en', $8), ($2, 'fr', $9)

        INSERT INTO dictionary (key, lang, translation)
        VALUES ($3, 'en', $10), ($3, 'fr', $11)
        `,
      [
        titleKey, // $1
        subtitleKey, // $2
        buttonKey, // $3
        body.link, // $4
        body.image, // $5
        body.title_en, // $6
        body.title_fr, // $7
        body.subtitle_en, // $8
        body.subtitle_fr, // $9
        body.button_en, // $10
        body.button_fr, // $11
      ],
    )
  }
}
