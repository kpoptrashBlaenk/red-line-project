import { Router } from 'express';
import pool from '../database/database';
import { Promotional } from '#/types/promotional';
// import { link } from 'ionicons/icons';

const router = Router()

router.get('/promotionals', async (req, res) => {
  try {
    const showAll = req.query.all === 'true';
    const query = showAll
      ? 'SELECT * FROM promotional'
      : 'SELECT * FROM promotional WHERE isactivate = true ORDER BY datecreate DESC';
    const result = await pool.query(query);
    const formattedPromotions:Promotional[] = result.rows.map((row) => ({
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
    }));
    res.json(formattedPromotions);
  } catch (error) {
    console.error('Error fetching promotionals:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
});

router.get('/promotionals/:id', async (req, res) => {
  const { id } = req.params; 
  try {
    const result = await pool.query('SELECT * FROM promotional WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Promotional item not found' });
    }
    const row = result.rows[0];
    const formattedPromotion:Promotional = {
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
    res.json(formattedPromotion);
  } catch (error) {
    console.error('Error fetching promotional item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/promotionals', async (req, res) => {
  const { title_en, title_fr, subtitle_en, subtitle_fr, button_en, button_fr, urlimage, link, index = 0 } = req.body
  try {
    const result = await pool.query(
      `INSERT INTO promotional
      (title_en, title_fr, subtitle_en, subtitle_fr, button_en, button_fr, urlimage, link, "index")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [title_en, title_fr, subtitle_en, subtitle_fr, button_en, button_fr, urlimage, link, index],
    );
    const row = result.rows[0];
    const formattedPromotion: Promotional = {
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
    res.status(201).json(formattedPromotion)
  } catch (error) {
    console.error('Error creating promotional item:', error)
    res.status(500).json({ error: 'Failed to create promotional item' })
  }
})

router.put('/promotionals/:id', async (req, res) => {
  const { id } = req.params
  const { title_en, title_fr, subtitle_en, subtitle_fr, button_en, button_fr, urlimage, link, isactivate, index } = req.body
  try {
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
      return res.status(404).json({ error: 'Promotional item not found' })
    }
    const row = result.rows[0];
    const formattedPromotion:Promotional = {
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
    }
    res.json(formattedPromotion)
  } catch (error) {
    console.error('Error updating promotional item:', error)
    res.status(500).json({ error: 'Failed to update Promotional item' })
  }
})

router.delete('/promotionals/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query(`DELETE FROM promotional WHERE id = $1 RETURNING *`, [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Promotional item not found' })
    }
    res.json({ message: 'Promotional item deleted successfully' })
  } catch (error) {
    console.error('Error deleting promotional item:', error)
    res.status(500).json({ error: 'Failed to delete promotional item' })
  }
})

export default router
