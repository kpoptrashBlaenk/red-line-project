import { Request, Response } from 'express'
import { AuthService, ForgotPasswordBody, ResetPasswordBody } from '../service/auth.service.js'

const authService = new AuthService()

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body as ForgotPasswordBody
    const success = await authService.forgotPassword(email)
    if (success) {
      res.json({ message: 'Reset email sent' })
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body as ResetPasswordBody
    const success = await authService.resetPassword(token, password)
    if (success) {
      res.json({ message: 'Password reset successful' })
    } else {
      res.status(400).json({ error: 'Invalid or expired token' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

