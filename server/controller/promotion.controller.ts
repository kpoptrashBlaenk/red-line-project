import { PromotionBody } from '$/types'
import { Request, Response } from 'express'
import { PromotionService } from '../service/promotion.service'

export default class PromotionController {
  private promotionService: PromotionService

  constructor() {
    this.promotionService = new PromotionService()
  }

  // get all promotions
  getAll = async (req: Request, res: Response) => {
    try {
      const promotions = await this.promotionService.findAll()

      res.status(200).json(promotions)
    } catch (error) {
      // error
      console.error('Error fetching promotions:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  // create a promotion
  create = async (req: Request, res: Response) => {
    try {
      const body = req.body as PromotionBody

      await this.promotionService.create(body)

      res.status(201)
    } catch (error) {
      // error
      console.error('Error creating promotion:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
