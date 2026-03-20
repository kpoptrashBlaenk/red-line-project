import { OrderBody } from '$/types'
import { Request, Response } from 'express'
import { OrderService } from '../service/order.service'

export default class OrderController {
  private orderService: OrderService

  constructor() {
    this.orderService = new OrderService()
  }

  getOrders = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id
      const data = await this.orderService.findAllOrders(userId)
      return res.status(200).json(data)

      // error
    } catch (error) {
      console.error('Error fetching orders:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  getSubscriptions = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id
      const data = await this.orderService.findAllSubscriptions(userId)
      return res.status(200).json(data)

      // error
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  createIntent = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id
      const bodies = req.body as OrderBody[]

      const clientSecret = await this.orderService.createIntent(userId, bodies)
      return res.status(200).json({ client_secret: clientSecret })

      // error
    } catch (error) {
      console.error('Error creating payment intent:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  confirm = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id
      const { payment_intent_id, bodies } = req.body as { payment_intent_id: string; bodies: OrderBody[] }

      const order = await this.orderService.confirmOrder(userId, payment_intent_id, bodies)
      return res.status(201).json(order)

      // error
    } catch (error) {
      console.error('Error confirming order:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  reactivateSubscription = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id
      const { subscription_id } = req.body

      const result = await this.orderService.reactivateSubscription(userId, subscription_id)

      if (result.requires_action) {
        return res.status(200).json({ requires_action: true, client_secret: result.client_secret })
      }

      return res.status(200).json({ requires_action: false })

      // error
    } catch (error) {
      console.error('Error reactivating subscription:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  deactivateSubscription = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id
      const { subscription_id } = req.body

      await this.orderService.deactivateSubscription(userId, subscription_id)
      return res.sendStatus(204)

      // error
    } catch (error) {
      console.error('Error deactivating subscription:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  modifySubscription = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id
      const { subscription_id, length, users, amount } = req.body

      await this.orderService.modifySubscription(userId, subscription_id, { length, users, amount })
      return res.sendStatus(204)

      // error
    } catch (error) {
      console.error('Error modifying subscription:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
