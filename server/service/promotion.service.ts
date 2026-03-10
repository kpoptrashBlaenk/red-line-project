import pool from '../database/database';
import { Promotion } from '$/types';

export class PromotionService {
  async getAllPromotions(): Promise<Promotion[]> {
    const query = 'SELECT * FROM promotional';
    const result = await pool.query(query);
    return result.rows.map((row) => this.formatPromotion(row));
  }

  async getPromotionById(id: string): Promise<Promotion | null> {
    const result = await pool.query('SELECT * FROM promotional WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.formatPromotion(result.rows[0]);
  }

  async createPromotion(promotionBody: Promotion): Promise<Promotion> {
    const { title_en, title_fr, subtitle_en, subtitle_fr, button_en, button_fr, urlimage, link, index } = promotionBody;
    const result = await pool.query(
      `INSERT INTO promotional
      (title_en, title_fr, subtitle_en, subtitle_fr, button_en, button_fr, urlimage, link, "index")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [title_en, title_fr, subtitle_en, subtitle_fr, button_en, button_fr, urlimage, link, index],
    );
    return this.formatPromotion(result.rows[0]);
  }

  async updatePromotion(id: string, promotionBody: Promotion): Promise<Promotion | null> {
    const { title_en, title_fr, subtitle_en, subtitle_fr, button_en, button_fr, urlimage, link, isactivate, index } = promotionBody;
    const result = await pool.query(
      `UPDATE promotional
      SET
        title_en = $1, title_fr = $2,
        subtitle_en = $3, subtitle_fr = $4,
        button_en = $5, button_fr = $6,
        urlimage = $7, link = $8,
        isactivate = $9, "index" = $10,
        update_date = NOW()
      WHERE id = $11
      RETURNING *`,
      [title_en, title_fr, subtitle_en, subtitle_fr, button_en, button_fr, urlimage, link, isactivate, index, id],
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

  private formatPromotion(row: any): Promotion {
    return {
      id: row.id,
      urlimage: row.urlimage,
      title_en: row.title_en,
      title_fr: row.title_fr,
      subtitle_en: row.subtitle_en,
      subtitle_fr: row.subtitle_fr,
      button_en: row.button_en,
      button_fr: row.button_fr,
      description: row.description,
      isactivate: row.isactivate,
      datecreate: row.datecreate,
      dateupdate: row.dateupdate,
      link: row.link,
      index: row.index,
    };
  }
}
