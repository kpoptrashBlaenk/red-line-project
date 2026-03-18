import pool from '../database/database';
import { CreatePromotionInput } from '../types/promotion';
import { LanguageRecord, Promotion } from '$/types';

export class PromotionService {
  async getAllPromotions(): Promise<Promotion[]> {
    const query = `
      SELECT
        p.*,

        json_object_agg(DISTINCT dt.lang, dt.translation) AS title,
        json_object_agg(DISTINCT ds.lang, ds.translation) AS subtitle,
        json_object_agg(DISTINCT db.lang, db.translation) AS button

      FROM promotion p
      LEFT JOIN dictionary dt ON dt.key = p.title_key
      LEFT JOIN dictionary ds ON ds.key = p.subtitle_key
      LEFT JOIN dictionary db ON db.key = p.button_key
      GROUP BY p.id;
      `;
    const result = await pool.query(query);
    return result.rows.map((row) => this.formatPromotion(row));
  }


  async getPromotionById(id: number): Promise<Promotion | null> {
    const result = await pool.query(
      `SELECT
          p.id,

          json_object_agg(DISTINCT dt.lang, dt.translation) AS title,
          json_object_agg(DISTINCT ds.lang, ds.translation) AS subtitle,
          json_object_agg(DISTINCT db.lang, db.translation) AS button

        FROM promotion p

        LEFT JOIN dictionary dt ON dt.key = p.title_key
        LEFT JOIN dictionary ds ON ds.key = p.subtitle_key
        LEFT JOIN dictionary db ON db.key = p.button_key

        WHERE p.id = $1

        GROUP BY p.id;`,
      [id]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return this.formatPromotion(result.rows[0]);
  }

  async createPromotion(promotionBody: CreatePromotionInput): Promise<Promotion> {

    const titleKey = crypto.randomUUID();
    const subtitleKey = crypto.randomUUID();
    const buttonKey = crypto.randomUUID();

    const { title, subtitle, button, link, image } = promotionBody;

    const insertTranslations = async (key: string, data: LanguageRecord) => {
      const values: any[] = [];
      const placeholders: string[] = [];
      let i = 1;

      for (const [lang, translation] of Object.entries(data)) {
        placeholders.push(`($${i++}, $${i++}, $${i++})`);
        values.push(key, lang, translation);
      }

      await pool.query(
        `INSERT INTO dictionary (key, lang, translation)
         VALUES ${placeholders.join(",")}`,
        values
      );
    };

    await insertTranslations(titleKey, title);
    await insertTranslations(subtitleKey, subtitle);
    await insertTranslations(buttonKey, button);

    const result = await pool.query(
      `INSERT INTO promotion
      (title_key, subtitle_key, button_key, image, link)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [titleKey, subtitleKey, buttonKey, image, link]
    );

    return this.formatPromotion(result.rows[0]);
  }


  async updatePromotion(id: number, promotionBody: Promotion): Promise<Promotion | null> {
    const { title, subtitle, button, image, link } = promotionBody;

    const { rows } = await pool.query(
      'SELECT title_key, subtitle_key, button_key FROM promotion WHERE id = $1',
      [id]
    );
    if (rows.length === 0) return null;
    const { title_key, subtitle_key, button_key } = rows[0];

    const upsertTranslations = async (key: string, data: LanguageRecord) => {
      for (const [lang, translation] of Object.entries(data)) {
        await pool.query(
          `INSERT INTO dictionary (key, lang, translation)
            VALUES ($1, $2, $3)`,
          [key, lang, translation]
        );
      }
    };

    await upsertTranslations(title_key, title);
    await upsertTranslations(subtitle_key, subtitle);
    await upsertTranslations(button_key, button);

    const result = await pool.query(
      `UPDATE promotion
      SET image = $1,
          link = $2
      WHERE id = $3
      RETURNING *`,
      [image, link, id]
    );

    if (result.rows.length === 0) return null;

    const promotionFull = await pool.query(
      `SELECT
        p.id,
        p.image,
        p.link,
        p."index",
        json_object_agg(DISTINCT dt.lang, dt.translation) AS title,
        json_object_agg(DISTINCT ds.lang, ds.translation) AS subtitle,
        json_object_agg(DISTINCT db.lang, db.translation) AS button
      FROM promotion p
      LEFT JOIN dictionary dt ON dt.key = p.title_key
      LEFT JOIN dictionary ds ON ds.key = p.subtitle_key
      LEFT JOIN dictionary db ON db.key = p.button_key
      WHERE p.id = $1
      GROUP BY p.id`,
      [id]
    );

    return this.formatPromotion(promotionFull.rows[0]);
  }

  async deletePromotion(id: number): Promise<boolean> {
    const result = await pool.query(`DELETE FROM promotion WHERE id = $1 RETURNING *`, [id]);
    return result.rows.length > 0;
  }

  private formatPromotion(row: any): Promotion {
    return {
      id: row.id,
      image: Array.isArray(row.image) ? row.image : [row.image], // converti en array
      title: row.title,
      subtitle: row.subtitle,
      button: row.button,
      link: row.link,
      index: row.index,
    };
  }
}
