import { Request, Response } from 'express';
import { PromotionService } from '../service/promotion.service';
import { CreatePromotionInput } from '../types/promotion';
import { Promotion } from '$/types';

export default class PromotionController {
  private promotionService: PromotionService;

  constructor() {
    this.promotionService = new PromotionService();
  }

  // Méthode pour récupérer toutes les promotions
  getAll = async (req: Request, res: Response) => {
    try {
      const promotions = await this.promotionService.getAllPromotions();
      res.status(200).json(promotions);
    } catch (error) {
      console.error('Error fetching promotionals:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error });
    }
  }

  // Méthode pour récupérer une promotion par ID
  getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    console.log(id)
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
  create = async (req: Request, res: Response) => {
    const promotionBody = req.body as CreatePromotionInput;
    try {
      const newPromotion = await this.promotionService.createPromotion(promotionBody);
      res.status(201).json(newPromotion);
    } catch (error) {
      console.error('Error creating promotional item:', error);
      res.status(500).json({ error: 'Failed to create promotional item' });
    }
  }

  // Méthode pour mettre à jour une promotion
  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
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
  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
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
