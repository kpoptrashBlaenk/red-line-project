import { Request, Response } from 'express';
import { PromotionService } from '../service/promotion.service';
import { Promotion } from '$/types';

export default class PromotionController {
  private promotionService: PromotionService;

  constructor() {
    this.promotionService = new PromotionService();
  }

  // Méthode pour récupérer toutes les promotions
  async getAll(req: Request, res: Response) {
    try {
      const promotions = await this.promotionService.getAllPromotions();
      res.status(200).json(promotions);
    } catch (error) {
      console.error('Error fetching promotionals:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error });
    }
  }

  // Méthode pour récupérer une promotion par ID
  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const promotion = await this.promotionService.getPromotionById(id);
      if (!promotion) {
        return res.status(404).json({ error: 'Promotional item not found' });
      }
      res.status(200).json(promotion);
    } catch (error) {
      console.error('Error fetching promotional item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Méthode pour créer une promotion
  async create(req: Request, res: Response) {
    const promotionBody = req.body as Promotion;
    try {
      const newPromotion = await this.promotionService.createPromotion(promotionBody);
      res.status(201).json(newPromotion);
    } catch (error) {
      console.error('Error creating promotional item:', error);
      res.status(500).json({ error: 'Failed to create promotional item' });
    }
  }

  // Méthode pour mettre à jour une promotion
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const promotionBody = req.body as Promotion;
    try {
      const updatedPromotion = await this.promotionService.updatePromotion(id, promotionBody);
      if (!updatedPromotion) {
        return res.status(404).json({ error: 'Promotional item not found' });
      }
      res.status(200).json(updatedPromotion);
    } catch (error) {
      console.error('Error updating promotional item:', error);
      res.status(500).json({ error: 'Failed to update promotional item' });
    }
  }

  // Méthode pour supprimer une promotion
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await this.promotionService.deletePromotion(id);
      if (!result) {
        return res.status(404).json({ error: 'Promotional item not found' });
      }
      res.status(200).json({ message: 'Promotional item deleted successfully' });
    } catch (error) {
      console.error('Error deleting promotional item:', error);
      res.status(500).json({ error: 'Failed to delete promotional item' });
    }
  }
}
