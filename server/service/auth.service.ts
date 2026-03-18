import pool from '../database/database.js'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export interface ForgotPasswordBody {
  email: string
}

export interface ResetPasswordBody {
  token: string
  password: string
}

export class AuthService {
  private transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  async forgotPassword(email: string): Promise<boolean> {
    const result = await pool.query('SELECT id, email FROM users WHERE email = $1', [email])
    if (result.rows.length === 0) return false

    const user = result.rows[0]
    const token = uuidv4()
    const expires = new Date(Date.now() + 15 * 60 * 1000)

    await pool.query(
      'UPDATE users SET reset_token = $1, reset_expires = $2 WHERE id = $3',
      [token, expires, user.id]
    )

    const resetUrl = `${process.env.APP_URL || 'http://localhost:8100'}/reset-password?token=${token}`
    await this.transporter.sendMail({
      from: '"Red Line" <noreply@redline.com>',
      to: user.email,
      subject: 'Password Reset',
      html: `Click <a href="${resetUrl}">here</a> to reset your password. Expires in 15 min.`,
    })

    return true
  }

  async resetPassword(token: string, password: string): Promise<boolean> {
    const result = await pool.query(
      'SELECT id FROM users WHERE reset_token = $1 AND reset_expires > NOW()',
      [token]
    )
    if (result.rows.length === 0) return false

    const userId = result.rows[0].id
    const hashedPassword = await bcrypt.hash(password, 12)

    await pool.query(
      'UPDATE users SET password = $1, reset_token = NULL, reset_expires = NULL WHERE id = $2',
      [hashedPassword, userId]
    )

    return true
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }
}

