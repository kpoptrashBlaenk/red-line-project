import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';

export default class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async requestPasswordReset(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email || !this.isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
      }


      const resetToken = await this.authService.createPasswordResetToken(email);


      await this.authService.sendPasswordResetEmail(email, resetToken);


      res.status(200).json({
        message: 'If an account exists with this email, a password reset link has been sent.'
      });
    } catch (error) {
      console.error('Error requesting password reset:', error);


      if (error instanceof Error && error.message === 'User not found') {
        res.status(200).json({
          message: 'If an account exists with this email, a password reset link has been sent.'
        });
      } else {
        res.status(500).json({ error: 'Failed to process password reset request' });
      }
    }
  }

  async validatePasswordResetToken(req: Request, res: Response) {
    try {
      const { token } = req.query;

      if (!token || typeof token !== 'string') {
        return res.status(400).json({ error: 'Invalid token' });
      }


      const { userId, email } = await this.authService.validatePasswordResetToken(token);

      res.status(200).json({
        valid: true,
        userId,
        email
      });
    } catch (error) {
      console.error('Error validating password reset token:', error);
      res.status(400).json({ 
        error: 'Invalid or expired token',
        valid: false
      });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;

      if (!token || typeof token !== 'string') {
        return res.status(400).json({ error: 'Invalid token' });
      }

      if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
      }

      const { userId } = await this.authService.validatePasswordResetToken(token);


      await this.authService.resetPassword(userId, newPassword);

      res.status(200).json({
        message: 'Password has been reset successfully'
      });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(400).json({ error: 'Failed to reset password' });
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}