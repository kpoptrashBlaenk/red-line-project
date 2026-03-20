import { pool } from '#/app'
import { UserRaw } from '#/types/database'
import { EmailBody, NameBody, PhoneBody, User } from '$/types'

export class UserService {
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

  async findByEmail(email: string): Promise<UserRaw | null> {
    const result = await pool.query<UserRaw>(
      `--sql
        SELECT * FROM "user" WHERE email = $1 LIMIT 1
      `,
      [email],
    )
    return result.rows[0] ?? null
  }

  async modifyName(userId: number, body: NameBody): Promise<User> {
    const result = await pool.query<UserRaw>(
      `--sql
        UPDATE "user"
        SET first_name = $1, last_name = $2
        WHERE id = $3
        RETURNING *
      `,
      [body.first_name, body.last_name, userId],
    )

    return this.toPublicUser(result.rows[0] as UserRaw & { token: string })
  }

  async modifyPhone(userId: number, body: PhoneBody): Promise<User> {
    const result = await pool.query<UserRaw>(
      `--sql
        UPDATE "user"
        SET phone = $1, prefix = $2
        WHERE id = $3
        RETURNING *
      `,
      [body.phone, body.prefix, userId],
    )

    return this.toPublicUser(result.rows[0] as UserRaw & { token: string })
  }

  async modifyEmail(userId: number, body: EmailBody): Promise<User> {
    const result = await pool.query<UserRaw>(
      `--sql
        UPDATE "user"
        SET email = $1
        WHERE id = $2
        RETURNING *
      `,
      [body.email, userId],
    )

    return this.toPublicUser(result.rows[0] as UserRaw & { token: string })
  }
}
