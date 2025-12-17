import { Router } from "express";
import pool from '../database/database'
import { Category } from "#/types/category";
import { formatError } from "zod";

const router = Router()

router.get('/categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM category ORDER BY "index" ASC');
        const formattedCategory:Category[] = result.rows.map((row) => ({
            id: row.id,
            urlimage: row.urlimage,
            title_en: row.title_en,
            title_fr: row.title_fr,
            subtitle_en: row.subtitle_en,
            subtitle_fr: row.subtitle_fr,
            button_en: row.button_en,
            button_fr: row.button_fr,
            index: row.index
        }));
        res.json(formattedCategory);
    } catch (error) {
        console.error('Error fetching categories :', error);
        res.status(500).json ({ error: 'Internal Server Error', details: error})
    }
}); 

router.get('/categories/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM category WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Category item not found' });
        }
        const row = result.rows[0];
        const formattedCategory:Category = {
            id: row.id,
            urlimage: row.image,
            title_en: row.title_en,
            title_fr: row.title_fr,
            subtitle_en: row.subtitle_en,
            subtitle_fr: row.subtitle_fr,
            button_en: row.button_en,
            button_fr: row.button_fr,
            index: row.index
        };
        res.json(formattedCategory);
    } catch (error) {
        console.error('Error fetching category item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/categories', async (req, res) => {
    const {urlimage, title_en, title_fr, subtitle_en, subtitle_fr, button_en, button_fr, index = 0} = req.body
    try {
        const result = await pool.query(
            `INSERT INTO category
            (urlimage, title_en, title_fr, subtitle_en, subtitle_fr, button_en, button_fr, "index")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
            `,
            [urlimage, title_en, title_fr, subtitle_en, subtitle_fr, button_en, button_fr, index],
        );
        const row = result.rows[0];
        const formattedCategory:Category = {
            id: row.id,
            urlimage: row.image,
            title_en: row.title_en,
            title_fr: row.title_fr,
            subtitle_en: row.subtitle_en,
            subtitle_fr: row.subtitle_fr,
            button_en: row.button_en,
            button_fr: row.button_fr,
            index: row.index
        };
        res.status(201).json({    
            id:formattedCategory.id,
            urlimage: formattedCategory.urlimage,
            title_en: formattedCategory.title_en,
            title_fr: formattedCategory.title_fr,
            subtitle_en: formattedCategory.subtitle_en,
            subtitle_fr: formattedCategory.subtitle_fr,
            button_en: formattedCategory.button_en,
            button_fr: formattedCategory.button_fr,
            index: row.index
        })
    } catch (error) {
        console.error('Error creating category item:', error)
        res.status(500).json( { error: 'Failed to create category item' })
    }
})

router.put('/categories/:id', async (req, res) => {
    const { id } = req.params
    const {urlimage, title_en, title_fr, subtitle_en, subtitle_fr, button_en, button_fr, index = 0}
    try {
        const result = await pool.query(
            `UPDATE category
            SET
                urlimage = $1,
                title_en = $2,
                title_fr = $3,
                subtitle_en = $4,
                subtitle_fr = $5,
                button_en = $6,
                button_fr = $7,
                "index" = $8,
                WHERE = $9
                RETURNING *
            `,
            [urlimage, title_en,title_fr, subtitle_en, subtitle_fr, button_en, button_fr, index, id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Category item not found' })
        }
        const row = result.rows[0];
        const formattedCategory:Category = {
            id: row.id,
            urlimage: row.urlimage,
            title_en: row.title_en,
            title_fr: row.title_fr,
            subtitle_en: row.subtitle_en,
            subtitle_fr: row.subtitle_fr,
            button_en: row.button_en,
            button_fr: row.button_fr,
            index: row.index
        }
        res.json(formattedCategory)
    } catch (error) {
        console.error('Error updating category item:', error)
        res.status(500).json({ error: 'Failed to update category item' })
    }
})

export default router