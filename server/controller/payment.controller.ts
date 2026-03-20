import { PaymentMethodService } from '#/service/payment.service'
import { PaymentMethodBody } from '$/types'
import { Request, Response } from 'express'

export default class PaymentMethodController {
  private paymentMethodService: PaymentMethodService

  constructor() {
    this.paymentMethodService = new PaymentMethodService()
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id

      const data = await this.paymentMethodService.findAll(userId)
      return res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching payment methods:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  create = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id
      const body = req.body as PaymentMethodBody

      const created = await this.paymentMethodService.create(userId, body)
      return res.status(201).json(created)
    } catch (error) {
      console.error('Error creating payment method:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id
      const id = parseInt(req.params.id)

      const method = await this.paymentMethodService.findById(id)
      if (!method) return res.status(404).json({ message: 'Payment method not found' })
      if (method.user_id !== userId) return res.status(403).json({ message: 'Forbidden' })

      await this.paymentMethodService.delete(id)
      return res.sendStatus(204)

      // error
    } catch (error) {
      console.error('Error deleting payment method:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
