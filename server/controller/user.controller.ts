import { EmailBody, NameBody, PhoneBody } from '$/types'
import { Request, Response } from 'express'
import { UserService } from '../service/user.service'

export default class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  modifyName = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id
      const body = req.body as NameBody

      const user = await this.userService.modifyName(userId, body)
      return res.status(200).json(user)

      // error
    } catch (error) {
      console.error('Error modifying name:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  modifyPhone = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id
      const body = req.body as PhoneBody

      const user = await this.userService.modifyPhone(userId, body)
      return res.status(200).json(user)

      // error
    } catch (error) {
      console.error('Error modifying phone:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  modifyEmail = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id
      const body = req.body as EmailBody

      const existing = await this.userService.findByEmail(body.email)
      if (existing && existing.id !== userId) {
        return res.status(409).json({ message: 'Email already in use' })
      }

      const user = await this.userService.modifyEmail(userId, body)
      return res.status(200).json(user)

      // error
    } catch (error) {
      console.error('Error modifying email:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
