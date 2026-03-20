import { AddressBody } from '$/types'
import { Request, Response } from 'express'
import { AddressService } from '../service/address.service'

export default class AddressController {
  private addressService: AddressService

  constructor() {
    this.addressService = new AddressService()
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id

      const data = await this.addressService.findAll(userId)
      return res.status(200).json(data)

      // error
    } catch (error) {
      console.error('Error fetching addresses:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  create = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id
      const body = req.body as AddressBody

      const created = await this.addressService.create(userId, body)
      return res.status(201).json(created)

      // error
    } catch (error) {
      console.error('Error creating address:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id
      const id = parseInt(req.params.id)
      const body = req.body as AddressBody

      const address = await this.addressService.findById(id)
      if (!address) return res.status(404).json({ message: 'Address not found' })
      if (address.user_id !== userId) return res.status(403).json({ message: 'Forbidden' })

      await this.addressService.update(id, body)
      return res.sendStatus(204)

      // error
    } catch (error) {
      console.error('Error updating address:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id
      const id = parseInt(req.params.id)

      const address = await this.addressService.findById(id)
      if (!address) return res.status(404).json({ message: 'Address not found' })
      if (address.user_id !== userId) return res.status(403).json({ message: 'Forbidden' })

      await this.addressService.delete(id)
      return res.sendStatus(204)

      // error
    } catch (error) {
      console.error('Error deleting address:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
