import { pool } from '#/app'
import { HomeTextRaw } from '#/types/database'
import { HomeText, HomeTextBody } from '$/types'
import { DictionaryService } from './dictionary.service'

export class HomeTextService {
  private dictionaryService: DictionaryService

  constructor() {
    this.dictionaryService = new DictionaryService()
  }

  async findAll() {
    const result = await pool.query<HomeText>(
      `--sql
        SELECT
            ht.id,
            jsonb_build_object(
                'fr', d_text_fr.translation,
                'en', d_text_en.translation
            ) AS text
        FROM home_text ht

        LEFT JOIN dictionary d_text_fr
            ON d_text_fr.key = ht.text_key AND d_text_fr.lang = 'fr'
        LEFT JOIN dictionary d_text_en
            ON d_text_en.key = ht.text_key AND d_text_en.lang = 'en';
    `,
    )

    return result.rows
  }

  async update(id: number, body: HomeTextBody) {
    // find home text for keys
    const result = await pool.query<HomeTextRaw>(
      `--sql
        SELECT * FROM home_text WHERE id = $1
        `,
      [id],
    )
    const homeText = result.rows[0]

    // update dictionary
    await this.dictionaryService.update({ key: homeText.text_key, en: body.text_en, fr: body.text_fr })
  }
}
