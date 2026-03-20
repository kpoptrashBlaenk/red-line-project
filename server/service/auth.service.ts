import { pool } from '#/app'
import { UserRaw } from '#/types/database'
import { User } from '$/types'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const SALT_ROUNDS = 12

export class AuthService {
  private generateToken(user: Pick<UserRaw, 'id' | 'is_admin'>): string {
    const JWT_SECRET = process.env.JWT_SECRET
    if (!JWT_SECRET) throw new Error('JWT_SECRET is not set in environment variables')
    return jwt.sign({ id: user.id, is_admin: user.is_admin }, JWT_SECRET)
    // No expiresIn — token lives forever until password change
  }

  private toPublicUser(user: UserRaw): User {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      prefix: user.prefix,
      is_admin: user.is_admin,
      token: user.token,
    }
  }

  private async saveToken(userId: number, token: string): Promise<void> {
    await pool.query(
      `--sql
        UPDATE "user" SET token = $1 WHERE id = $2
      `,
      [token, userId],
    )
  }

  async findByEmail(email: string): Promise<UserRaw | null> {
    const result = await pool.query<UserRaw>(
      `--sql
        SELECT * FROM "user" WHERE email = $1 LIMIT 1
      `,
      [email],
    )
    return result.rows[0] ?? null
  }

  async findById(id: number): Promise<User | null> {
    const result = await pool.query<UserRaw>(
      `--sql
        SELECT * FROM "user" WHERE id = $1 LIMIT 1
      `,
      [id],
    )
    const user = result.rows[0]
    if (!user || !user.token) return null
    return this.toPublicUser(user as UserRaw & { token: string })
  }

  async findByToken(token: string): Promise<User | null> {
    const result = await pool.query<UserRaw>(
      `--sql
        SELECT * FROM "user" WHERE token = $1 LIMIT 1
      `,
      [token],
    )
    const user = result.rows[0]
    if (!user || !user.token) return null
    return this.toPublicUser(user)
  }

  async register(body: {
    first_name: string
    last_name: string
    email: string
    password: string
    phone: string
    prefix: string
  }): Promise<User> {
    const hashed = await bcrypt.hash(body.password, SALT_ROUNDS)

    const result = await pool.query<UserRaw>(
      `--sql
        INSERT INTO "user" (first_name, last_name, email, password, phone, prefix, is_admin)
        VALUES ($1, $2, $3, $4, $5, $6, false)
        RETURNING *
      `,
      [body.first_name, body.last_name, body.email, hashed, body.phone, body.prefix],
    )

    const user = result.rows[0]

    // Generate token once — lives until password change
    const token = this.generateToken(user)
    await this.saveToken(user.id, token)

    return this.toPublicUser({ ...user, token })
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email)
    if (!user) return null

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return null

    // Return the existing stored token — no need to regenerate
    if (!user.token) return null
    return this.toPublicUser(user as UserRaw & { token: string })
  }

  async verifyPassword(userId: number, password: string): Promise<boolean> {
    const result = await pool.query<{ password: string }>(
      `--sql
        SELECT password FROM "user" WHERE id = $1 LIMIT 1
      `,
      [userId],
    )
    const user = result.rows[0]
    if (!user) return false
    return bcrypt.compare(password, user.password)
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.findByEmail(email)
    if (!user) return

    const token = crypto.randomBytes(32).toString('hex')

    await pool.query(
      `--sql
        INSERT INTO reset_token (token) VALUES ($1)
      `,
      [token],
    )

    // TODO: send reset by email
    console.log(`[forgot-password] reset link for ${email}: /reset-password?token=${token}`)
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const tokenResult = await pool.query<{ token: string; expires_at: Date }>(
      `--sql
        SELECT * FROM reset_token WHERE token = $1 LIMIT 1
      `,
      [token],
    )

    const row = tokenResult.rows[0]
    if (!row) return false
    if (new Date() > new Date(row.expires_at)) {
      await pool.query(`DELETE FROM reset_token WHERE token = $1`, [token])
      return false
    }

    const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS)

    const userResult = await pool.query<UserRaw>(
      `--sql
        UPDATE "user" SET password = $1
        WHERE email = (SELECT email FROM reset_token WHERE token = $2)
        RETURNING *
      `,
      [hashed, token],
    )

    await pool.query(`DELETE FROM reset_token WHERE token = $1`, [token])

    const user = userResult.rows[0]
    if (user) {
      const newToken = this.generateToken(user)
      await this.saveToken(user.id, newToken)
    }

    return true
  }

  async deleteUser(id: number): Promise<void> {
    await pool.query(
      `--sql
        DELETE FROM "user" WHERE id = $1
      `,
      [id],
    )
  }

  async changePassword(userId: number, newPassword: string): Promise<User | null> {
    const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS)

    const result = await pool.query<UserRaw>(
      `--sql
        UPDATE "user" SET password = $1 WHERE id = $2 RETURNING *
      `,
      [hashed, userId],
    )

    const user = result.rows[0]
    if (!user) return null

    const newToken = this.generateToken(user)
    await this.saveToken(user.id, newToken)

    return this.toPublicUser({ ...user, token: newToken })
  }
}
