import { HomeTextService } from '#/service/homeText.service'
import { HomeTextBody } from '$/types'
import { Request, Response } from 'express'

export default class HomeTextController {
  private homeTextService: HomeTextService

  constructor() {
    this.homeTextService = new HomeTextService()
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const promotions = await this.homeTextService.findAll()

      return res.status(200).json(promotions)

      // error
    } catch (error) {
      console.error('Error fetching home text:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id)
      const body = req.body as HomeTextBody

      await this.homeTextService.update(id, body)

      return res.sendStatus(204)

      // error
    } catch (error) {
      console.error('Error updating home text:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
