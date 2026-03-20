import { pool } from '#/app'
import { AddressRaw } from '#/types/database'
import { AddressBody } from '$/types'
import { Address } from '$/types'

export class AddressService {
  async findAll(userId: number): Promise<Address[]> {
    const result = await pool.query<Address>(
      `--sql
        SELECT
          id, first_name, last_name, street_address, extended_address,
          locality, region, postal_code, country_code, phone, prefix
        FROM address
        WHERE user_id = $1
        ORDER BY id ASC
      `,
      [userId],
    )
    return result.rows
  }

  async findById(id: number): Promise<AddressRaw | null> {
    const result = await pool.query<AddressRaw>(
      `--sql
        SELECT * FROM address WHERE id = $1 LIMIT 1
      `,
      [id],
    )
    return result.rows[0] ?? null
  }

  async create(userId: number, body: AddressBody): Promise<Address> {
    const result = await pool.query<Address>(
      `--sql
        INSERT INTO address
          (user_id, first_name, last_name, street_address, extended_address,
           locality, region, postal_code, country_code, phone, prefix)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING
          id, first_name, last_name, street_address, extended_address,
          locality, region, postal_code, country_code, phone, prefix
      `,
      [
        userId,
        body.first_name,
        body.last_name,
        body.street_address,
        body.extended_address ?? null,
        body.locality,
        body.region,
        body.postal_code,
        body.country_code,
        body.phone,
        body.prefix,
      ],
    )
    return result.rows[0]
  }

  async update(id: number, body: AddressBody): Promise<void> {
    await pool.query(
      `--sql
        UPDATE address
        SET
          first_name = $1, last_name = $2, street_address = $3,
          extended_address = $4, locality = $5, region = $6,
          postal_code = $7, country_code = $8, phone = $9, prefix = $10
        WHERE id = $11
      `,
      [
        body.first_name,
        body.last_name,
        body.street_address,
        body.extended_address ?? null,
        body.locality,
        body.region,
        body.postal_code,
        body.country_code,
        body.phone,
        body.prefix,
        id,
      ],
    )
  }

  async delete(id: number): Promise<void> {
    await pool.query(
      `--sql
        DELETE FROM address WHERE id = $1
      `,
      [id],
    )
  }
}
