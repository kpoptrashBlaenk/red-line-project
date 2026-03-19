import { RegisterBody } from '$/types'
import { Request, Response } from 'express'
import { AuthService } from '../service/auth.service'

export default class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  register = async (req: Request, res: Response) => {
    try {
      const { first_name, last_name, email, password, phone, prefix } = req.body as RegisterBody

      const existing = await this.authService.findByEmail(email)
      if (existing) return res.status(409).json({ message: 'Email already in use' })

      const user = await this.authService.register({ first_name, last_name, email, password, phone, prefix })

      return res.status(201).json(user)
    } catch (error) {
      console.error('Error registering user:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      const user = await this.authService.login(email, password)
      if (!user) return res.status(401).json({ message: 'Invalid credentials' })

      return res.status(200).json(user)
    } catch (error) {
      console.error('Error logging in:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  restore = async (req: Request, res: Response) => {
    try {
      const token = req.body.token as string

      const user = await this.authService.findByToken(token)
      if (!user) return res.status(404).json({ message: 'User not found' })

      return res.status(200).json(user)
    } catch (error) {
      console.error('Error restoring session:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  verifyPassword = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id
      const { password } = req.body

      const valid = await this.authService.verifyPassword(userId, password)

      return res.status(200).json(valid)
    } catch (error) {
      console.error('Error verifying password:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body

      await this.authService.forgotPassword(email)

      return res.sendStatus(200)
    } catch (error) {
      console.error('Error processing forgot password:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  resetPassword = async (req: Request, res: Response) => {
    try {
      const { token, password } = req.body

      const ok = await this.authService.resetPassword(token, password)
      if (!ok) return res.status(400).json({ message: 'Invalid or expired token' })

      return res.sendStatus(200)
    } catch (error) {
      console.error('Error resetting password:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id

      await this.authService.deleteUser(userId)

      return res.sendStatus(204)
    } catch (error) {
      console.error('Error deleting user:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
