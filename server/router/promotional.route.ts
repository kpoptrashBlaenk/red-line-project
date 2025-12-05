import { Router } from 'express'
import pool from '../database/database.ts'
import { Promotional } from '../types/promotional.ts'


const router = Router();

router.get('/promotionals', async (req, res) => {
    try {
        const result = await pool.query<Promotional>(
            'SELECT * FROM promotional WHERE is_activate = true ORDER BY date_create DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching promotionals:', error);
        res.status(500).json({ error: 'Internal Server Error'})
    }
});

router.get('/promotionals/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query<Promotional>(
            'SELECT * FROM promotional WHERE id = $1',
            [id]
        )
        if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Promotional item not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching promotional item:', error);
        res.status(500).json({ error : 'Internal Server Error'})
        }
});

router.post('/promotionals', async (req, res) => {
    const {titre, description, urlImage, link} = req.body;
    try {
        const result = await pool.query<Promotional>(
            `INSERT INTO promotional (titre, description, url_image, link) VALUES ($1, $2, $3, $4) RETURNING *`,
            [titre, description, urlImage, link]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating promotional item:', error)
        res.status(500).json({ error: 'Failed to create promotional item'})
    }
});

router.put('/promotionals/:id', async (req, res) => {
    const { id } = req.params;
    const { titre, description, urlImage, link, isActivate } = req.body;
    try {
        const result = await pool.query<Promotional>(
            `UPDATE promotional SET titre = $1, description = $2, url_image = $3, link = $5, isActivate = $6, update_date = NOW() WHERE id = $4 RETURNING *`,
            [titre, description, urlImage, id, link, isActivate]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Promotional item not found'});
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating promotional item:', error);
        res.status(500).json({ error: 'Failed to update Promotional item'})
    }
})

router.delete('/promotionals/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `DELETE FROM promotional WHERE id = $1 RETURNING *`,
            [id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Promotional item not found'});
        }
        res.json({ message: 'Promotional item deleted successfully'});
    } catch (error) {
        console.error('Error deleting promotional item:', error);
        res.status(500).json({ error: 'Failed to delete promotional item'});
    }
});

export default router;