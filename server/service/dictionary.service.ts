import { pool } from '#/app'
import { DictionaryBody } from '$/types'

export class DictionaryService {
  constructor() {}

  async create(body: DictionaryBody) {
    await pool.query(
      `--sql
        INSERT INTO dictionary (key, lang, translation)
        VALUES ($1, 'en', $2), ($1, 'fr', $3);
        `,
      [
        body.key, // $1
        body.en, // $2
        body.fr, // $3
      ],
    )
  }
}
