import pool from '../database/database';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

export class AuthService {
  private saltRounds: number;

  constructor() {
    this.saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');
  }

  async findUserByEmail(email: string): Promise<any> {
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  async createPasswordResetToken(email: string): Promise<string> {
    try {

      const user = await this.findUserByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }


      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenHash = await bcrypt.hash(resetToken, this.saltRounds);
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now


      await pool.query(
        `INSERT INTO password_reset_tokens 
         (user_id, token_hash, expires_at) 
         VALUES ($1, $2, $3) 
         ON CONFLICT (user_id) 
         DO UPDATE SET token_hash = EXCLUDED.token_hash, expires_at = EXCLUDED.expires_at`,
        [user.id, resetTokenHash, expiresAt]
      );

      return resetToken;
    } catch (error) {
      console.error('Error creating password reset token:', error);
      throw error;
    }
  }

  async validatePasswordResetToken(token: string): Promise<{userId: string, email: string}> {
    try {

      const result = await pool.query(
        'SELECT user_id, expires_at FROM password_reset_tokens WHERE token_hash = $1',
        [token]
      );

      if (result.rows.length === 0) {
        throw new Error('Invalid or expired token');
      }

      const tokenData = result.rows[0];


      if (new Date(tokenData.expires_at) < new Date()) {
        throw new Error('Token has expired');
      }

 
      const userResult = await pool.query('SELECT id, email FROM users WHERE id = $1', [tokenData.user_id]);
      if (userResult.rows.length === 0) {
        throw new Error('User not found');
      }

      return {
        userId: userResult.rows[0].id,
        email: userResult.rows[0].email
      };
    } catch (error) {
      console.error('Error validating password reset token:', error);
      throw error;
    }
  }

  async resetPassword(userId: string, newPassword: string): Promise<void> {
    try {

      const passwordHash = await bcrypt.hash(newPassword, this.saltRounds);


      await pool.query(
        'UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2',
        [passwordHash, userId]
      );


      await pool.query('DELETE FROM password_reset_tokens WHERE user_id = $1', [userId]);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    try {

      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

      console.log(`Password reset email would be sent to: ${email}`);
      console.log(`Reset URL: ${resetUrl}`);

      // TODO: Implement actual email sending using nodemailer or similar
      // const transporter = nodemailer.createTransport({
      //   host: process.env.SMTP_HOST,
      //   port: parseInt(process.env.SMTP_PORT || '587'),
      //   secure: process.env.SMTP_SECURE === 'true',
      //   auth: {
      //     user: process.env.SMTP_USER,
      //     pass: process.env.SMTP_PASS,
      //   },
      // });

      // await transporter.sendMail({
      //   from: process.env.EMAIL_FROM,
      //   to: email,
      //   subject: 'Password Reset Request',
      //   html: `Please click <a href="${resetUrl}">here</a> to reset your password.`,
      // });
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }
}