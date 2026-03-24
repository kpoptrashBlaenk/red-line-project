import { pool } from '#/app'
import { PaymentMethodRaw } from '#/types/database'
import { PaymentMethod, PaymentMethodBody } from '$/types'
import dotenv from 'dotenv'
import Stripe from 'stripe'

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export class PaymentMethodService {
  async findAll(userId: number): Promise<PaymentMethod[]> {
    const result = await pool.query<PaymentMethod>(
      `--sql
        SELECT id, name, last4, expiration
        FROM payment_method
        WHERE user_id = $1 AND active = true
        ORDER BY id ASC
      `,
      [userId],
    )
    return result.rows
  }

  async findById(id: number): Promise<PaymentMethodRaw | null> {
    const result = await pool.query<PaymentMethodRaw>(
      `--sql
        SELECT * FROM payment_method WHERE id = $1 LIMIT 1
      `,
      [id],
    )
    return result.rows[0] ?? null
  }

  async create(userId: number, body: PaymentMethodBody): Promise<PaymentMethod> {
    const userResult = await pool.query<{ stripe_customer_id: string }>(
      `SELECT stripe_customer_id FROM "user" WHERE id = $1 LIMIT 1`,
      [userId],
    )
    const customerId = userResult.rows[0]?.stripe_customer_id
    if (!customerId) throw new Error('Stripe customer not found')

    await stripe.paymentMethods.attach(body.token, { customer: customerId })

    const stripePaymentMethod = await stripe.paymentMethods.retrieve(body.token)

    if (!stripePaymentMethod.card) {
      throw new Error('Invalid payment method')
    }

    const last4 = stripePaymentMethod.card.last4
    const expiration = `${String(stripePaymentMethod.card.exp_month).padStart(2, '0')}/${String(stripePaymentMethod.card.exp_year).slice(-2)}`

    const result = await pool.query<PaymentMethod>(
      `--sql
        INSERT INTO payment_method (user_id, provider_id, name, last4, expiration)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, last4, expiration
      `,
      [userId, body.token, body.name, last4, expiration],
    )

    return result.rows[0]
  }

  async delete(id: number): Promise<void> {
    await pool.query(
      `--sql
         UPDATE payment_method SET active = false WHERE id = $1
      `,
      [id],
    )
  }
}
