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

  async update(body: DictionaryBody) {
    await pool.query(
      `--sql
      UPDATE dictionary
      SET translation = $3
      WHERE key = $1 AND lang = $2;
      `,
      [body.key, 'en', body.en],
    )

    await pool.query(
      `--sql
      UPDATE dictionary
      SET translation = $3
      WHERE key = $1 AND lang = $2;
      `,
      [body.key, 'fr', body.fr],
    )
  }

  async delete(key: string) {
    await pool.query(
      `--sql
      DELETE FROM dictionary
      WHERE key = $1;
      `,
      [key],
    )
  }
}
