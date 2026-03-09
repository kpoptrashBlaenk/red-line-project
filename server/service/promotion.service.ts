import pool from '../database/database';
import { PromotionRaw } from '../types/promotion';

export class PromotionService {
  async getAllPromotions(): Promise<PromotionRaw[]> {
    const query = `SELECT
        p.id,
        p.title_key,
        json_object_agg(d.lang, d.translation) AS title
      FROM promotion p
      JOIN dictionary d ON p.title_key = d.key
      GROUP BY p.id, p.title_key;`;
    const result = await pool.query(query);
    return result.rows.map((row) => this.formatPromotion(row));
  }

  async getPromotionById(id: string): Promise<PromotionRaw | null> {
    const result = await pool.query(`SELECT
        p.id,
        p.title_key,
        json_object_agg(d.lang, d.translation) AS title
      FROM promotion p
      JOIN dictionary d ON p.title_key = d.key
      WHERE p.id = $1
      GROUP BY p.id, p.title_key;`, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.formatPromotion(result.rows[0]);
  }

  async createPromotion(promotionBody: PromotionRaw): Promise<PromotionRaw> {
    const { title_key, subtitle_key, button_key, image, link } = promotionBody;
    const result = await pool.query(
      `INSERT INTO promotional
      (title_key, subtitle_key, button_key, image, link)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [title_key, subtitle_key, button_key, image, link],
    );
    return this.formatPromotion(result.rows[0]);
  }

  async updatePromotion(id: string, promotionBody: PromotionRaw): Promise<PromotionRaw | null> {
    const { title_key, subtitle_key, button_key, image, link } = promotionBody;
    const result = await pool.query(
      // Modify title_key, etc... for it to work now
      // Based on a langage table with : key / title / langage
      `UPDATE promotional
      SET
        title_key = $1, title_fr = $2,
        subtitle_key = $3, subtitle_fr = $4, 
        button_key = $5, button_fr = $6,
        image = $7, link = $8,
        isactivate = $9, "index" = $10,
        update_date = NOW()
      WHERE id = $11
      RETURNING *`,
      [title_key, subtitle_key, button_key, image, link, id],
    );
    if (result.rows.length === 0) {
      return null;
    }
    return this.formatPromotion(result.rows[0]);
  }

  async deletePromotion(id: string): Promise<boolean> {
    const result = await pool.query(`DELETE FROM promotional WHERE id = $1 RETURNING *`, [id]);
    return result.rows.length > 0;
  }

  private formatPromotion(row: any): PromotionRaw {
    return {
      id: row.id,
      image: row.image,
      title_key: row.title_key,
      subtitle_key: row.subtitle_key,
      button_key: row.button_key,
      link: row.link,
    };
  }
}
