import { pool } from '#/app'

export class PromotionService {
  constructor() {}

  async findAll() {
    const result = await pool.query(`--sql
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
    ON d_button_en.key = p.button_key AND d_button_en.lang = 'en';
    `)

    return result.rows
  }
}
