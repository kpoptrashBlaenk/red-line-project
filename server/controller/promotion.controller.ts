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

      return res.status(200).json(promotions)
    } catch (error) {
      // error
      console.error('Error fetching promotions:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  // create a promotion
  create = async (req: Request, res: Response) => {
    try {
      const body = req.body as PromotionBody

      await this.promotionService.create(body)

      return res.sendStatus(201)
    } catch (error) {
      // error
      console.error('Error creating promotion:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id)
      const body = req.body as PromotionBody

      await this.promotionService.update(id, body)

      return res.sendStatus(204)
    } catch (error) {
      // error
      console.error('Error updating promotion:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id)

      await this.promotionService.delete(id)

      return res.sendStatus(204)
    } catch (error) {
      // error
      console.error('Error deleting promotion:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
