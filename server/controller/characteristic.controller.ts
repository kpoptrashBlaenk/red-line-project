import { CharacteristicType } from '$/types'
import { Request, Response } from 'express'
import { CharacteristicService } from '../service/characteristic.service'
import { Container } from '../utils/container'

export default class CharacteristicController {
  private characteristicService: CharacteristicService

  constructor() {
    this.characteristicService = Container.getInstance().getCharacteristicService()
  }

  getAll = async (_req: Request, res: Response) => {
    try {
      const data = await this.characteristicService.findAll()
      return res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching characteristics:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  getByIds = async (req: Request, res: Response) => {
    try {
      const ids = req.body as number[]

      const data = await this.characteristicService.findByIds(ids)

      return res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching characteristics by ids:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  getByType = async (req: Request, res: Response) => {
    try {
      const type = req.params.type as CharacteristicType

      const data = await this.characteristicService.findByType(type)

      return res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching characteristics by type:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  create = async (req: Request, res: Response) => {
    try {
      const body = req.body as {
        name_en: string
        name_fr: string
        type: CharacteristicType
      }

      const created = await this.characteristicService.create(body)

      return res.status(201).json(created)
    } catch (error) {
      console.error('Error creating characteristic:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id)

      const body = req.body as {
        name_en: string
        name_fr: string
        type: CharacteristicType
      }

      await this.characteristicService.update(id, body)

      return res.sendStatus(204)
    } catch (error) {
      console.error('Error updating characteristic:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id)

      await this.characteristicService.delete(id)

      return res.sendStatus(204)
    } catch (error) {
      console.error('Error deleting characteristic:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
