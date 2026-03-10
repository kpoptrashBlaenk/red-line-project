import { Request, Response } from 'express'
import { PromotionService } from '../service/promotion.service'

export default class PromotionController {
  private promotionService: PromotionService

  constructor() {
    this.promotionService = new PromotionService()
  }

  // Méthode pour récupérer toutes les promotions
  async getAll(req: Request, res: Response) {}
}
