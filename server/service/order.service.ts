import { pool } from '#/app'
import { OrderRaw, SubscriptionRaw, UserRaw } from '#/types/database'
import { Order, OrderBody, Subscription, SubscriptionLength } from '$/types'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

function addLength(date: Date, length: SubscriptionLength): Date {
  const next = new Date(date)
  if (length === 'monthly') next.setMonth(next.getMonth() + 1)
  else if (length === 'yearly') next.setFullYear(next.getFullYear() + 1)
  return next
}

type LastOrderInfo = {
  order_id: number
  address_id: number
  payment_method_id: number
  provider_id: string
  address_active: boolean
  payment_method_active: boolean
  product_active: boolean
  customer: string
}

export class OrderService {
  async findAllOrders(userId: number) {
    const result = await pool.query<Order>(
      `--sql
        SELECT
          o.id,
          o.created_at,
          COALESCE(SUM(s.price), 0) AS price,
          jsonb_build_object(
            'id', u.id, 'first_name', u.first_name, 'last_name', u.last_name,
            'email', u.email, 'phone', u.phone, 'prefix', u.prefix, 'is_admin', u.is_admin
          ) AS "user",
          jsonb_build_object(
            'id', a.id, 'first_name', a.first_name, 'last_name', a.last_name,
            'street_address', a.street_address, 'extended_address', a.extended_address,
            'locality', a.locality, 'region', a.region, 'postal_code', a.postal_code,
            'country_code', a.country_code, 'phone', a.phone, 'prefix', a.prefix
          ) AS address,
          jsonb_build_object(
            'id', pm.id, 'name', pm.name, 'last4', pm.last4, 'expiration', pm.expiration
          ) AS payment_method,
          COALESCE(
            jsonb_agg(
              jsonb_build_object(
                'status', CASE
                  WHEN p.active = false THEN 'inactive'
                  WHEN EXISTS (
                    SELECT 1
                    FROM order_subscription os2
                    JOIN "order" o2 ON o2.id = os2.order_id
                    WHERE os2.subscription_id = s.id
                      AND o2.created_at > o.created_at
                  ) THEN 'renewed'
                  WHEN s.active = true THEN 'active'
                  ELSE 'inactive'
                END,
                'subscription', jsonb_build_object(
                  'id', s.id,
                  'length', s.length,
                  'users', s.users,
                  'amount', s.amount,
                  'price', s.price,
                  'active', s.active,
                  'renews_at', s.renews_at,
                  'user', jsonb_build_object(
                    'id', u.id, 'first_name', u.first_name, 'last_name', u.last_name,
                    'email', u.email, 'phone', u.phone, 'prefix', u.prefix, 'is_admin', u.is_admin
                  ),
                  'product', jsonb_build_object(
                    'id', p.id, 'price', p.price, 'disponible', p.disponible,
                    'top', p.top, 'priority', p.priority, 'index', p.index,
                    'created_at', p.created_at,
                    'name', jsonb_build_object('en', d_name_en.translation, 'fr', d_name_fr.translation),
                    'category', jsonb_build_object(
                      'id', c.id, 'index', c.index,
                      'name', jsonb_build_object('en', d_cat_name_en.translation, 'fr', d_cat_name_fr.translation),
                      'description', jsonb_build_object('en', d_cat_desc_en.translation, 'fr', d_cat_desc_fr.translation)
                    )
                  ),
                  'address', jsonb_build_object(
                    'id', a.id, 'first_name', a.first_name, 'last_name', a.last_name,
                    'street_address', a.street_address, 'extended_address', a.extended_address,
                    'locality', a.locality, 'region', a.region, 'postal_code', a.postal_code,
                    'country_code', a.country_code, 'phone', a.phone, 'prefix', a.prefix
                  ),
                  'payment_method', jsonb_build_object(
                    'id', pm.id, 'name', pm.name, 'last4', pm.last4, 'expiration', pm.expiration
                  )
                )
              )
            ) FILTER (WHERE s.id IS NOT NULL),
            '[]'
          ) AS subscriptions
        FROM "order" o
        JOIN "user" u ON u.id = o.user_id
        JOIN address a ON a.id = o.address_id
        JOIN payment_method pm ON pm.id = o.payment_method_id
        LEFT JOIN order_subscription os ON os.order_id = o.id
        LEFT JOIN subscription s ON s.id = os.subscription_id
        LEFT JOIN product p ON p.id = s.product_id
        LEFT JOIN category c ON c.id = p.category_id
        LEFT JOIN dictionary d_name_en ON d_name_en.key = p.name_key AND d_name_en.lang = 'en'
        LEFT JOIN dictionary d_name_fr ON d_name_fr.key = p.name_key AND d_name_fr.lang = 'fr'
        LEFT JOIN dictionary d_cat_name_en ON d_cat_name_en.key = c.name_key AND d_cat_name_en.lang = 'en'
        LEFT JOIN dictionary d_cat_name_fr ON d_cat_name_fr.key = c.name_key AND d_cat_name_fr.lang = 'fr'
        LEFT JOIN dictionary d_cat_desc_en ON d_cat_desc_en.key = c.description_key AND d_cat_desc_en.lang = 'en'
        LEFT JOIN dictionary d_cat_desc_fr ON d_cat_desc_fr.key = c.description_key AND d_cat_desc_fr.lang = 'fr'
        WHERE o.user_id = $1
        GROUP BY o.id, u.id, a.id, pm.id
        ORDER BY o.created_at DESC
      `,
      [userId],
    )
    return result.rows
  }

  async findAllSubscriptions(userId: number) {
    const result = await pool.query<Subscription>(
      `--sql
        SELECT
          s.id,
          s.length,
          s.users,
          s.amount,
          s.price,
          s.active,
          s.renews_at,
          jsonb_build_object(
            'id', u.id, 'first_name', u.first_name, 'last_name', u.last_name,
            'email', u.email, 'phone', u.phone, 'prefix', u.prefix, 'is_admin', u.is_admin
          ) AS "user",
          jsonb_build_object(
            'id', p.id, 'price', p.price, 'disponible', p.disponible,
            'top', p.top, 'priority', p.priority, 'index', p.index, 'active', p.active,
            'created_at', p.created_at,
            'name', jsonb_build_object('en', d_name_en.translation, 'fr', d_name_fr.translation),
            'image', COALESCE(
              json_agg(pi.image ORDER BY pi.first DESC) FILTER (WHERE pi.id IS NOT NULL),
              '[]'
            ),
            'category', jsonb_build_object(
              'id', c.id, 'index', c.index,
              'name', jsonb_build_object('en', d_cat_name_en.translation, 'fr', d_cat_name_fr.translation),
              'description', jsonb_build_object('en', d_cat_desc_en.translation, 'fr', d_cat_desc_fr.translation)
            )
          ) AS product,
          jsonb_build_object(
            'id', a.id, 'first_name', a.first_name, 'last_name', a.last_name,
            'street_address', a.street_address, 'extended_address', a.extended_address,
            'locality', a.locality, 'region', a.region, 'postal_code', a.postal_code,
            'country_code', a.country_code, 'phone', a.phone, 'prefix', a.prefix
          ) AS address,
          jsonb_build_object(
            'id', pm.id, 'name', pm.name, 'last4', pm.last4, 'expiration', pm.expiration
          ) AS payment_method
        FROM subscription s
        JOIN "user" u ON u.id = s.user_id
        JOIN product p ON p.id = s.product_id
        JOIN category c ON c.id = p.category_id
        LEFT JOIN product_image pi ON pi.product_id = p.id
        LEFT JOIN dictionary d_name_en ON d_name_en.key = p.name_key AND d_name_en.lang = 'en'
        LEFT JOIN dictionary d_name_fr ON d_name_fr.key = p.name_key AND d_name_fr.lang = 'fr'
        LEFT JOIN dictionary d_cat_name_en ON d_cat_name_en.key = c.name_key AND d_cat_name_en.lang = 'en'
        LEFT JOIN dictionary d_cat_name_fr ON d_cat_name_fr.key = c.name_key AND d_cat_name_fr.lang = 'fr'
        LEFT JOIN dictionary d_cat_desc_en ON d_cat_desc_en.key = c.description_key AND d_cat_desc_en.lang = 'en'
        LEFT JOIN dictionary d_cat_desc_fr ON d_cat_desc_fr.key = c.description_key AND d_cat_desc_fr.lang = 'fr'
        LEFT JOIN LATERAL (
          SELECT o.address_id, o.payment_method_id
          FROM "order" o
          JOIN order_subscription os ON os.order_id = o.id
          WHERE os.subscription_id = s.id
          ORDER BY o.created_at DESC
          LIMIT 1
        ) last_order ON true
        LEFT JOIN address a ON a.id = last_order.address_id
        LEFT JOIN payment_method pm ON pm.id = last_order.payment_method_id
        WHERE s.user_id = $1
        GROUP BY
          s.id, u.id, p.id, c.id,
          d_name_en.translation, d_name_fr.translation,
          d_cat_name_en.translation, d_cat_name_fr.translation,
          d_cat_desc_en.translation, d_cat_desc_fr.translation,
          a.id, pm.id
        ORDER BY s.id DESC
      `,
      [userId],
    )

    return result.rows.filter((subscription) => subscription.product.active)
  }

  async createIntent(userId: number, bodies: OrderBody[]) {
    const pmResult = await pool.query<{ provider_id: string }>(
      `--sql
        SELECT provider_id FROM payment_method WHERE id = $1 AND user_id = $2 LIMIT 1
      `,
      [bodies[0].payment_method_id, userId],
    )

    const providerMethod = pmResult.rows[0]
    if (!providerMethod) throw new Error('Payment method not found')

    const userResult = await pool.query<UserRaw>(`SELECT stripe_customer_id FROM "user" WHERE id = $1 LIMIT 1`, [userId])
    const customer = userResult.rows[0].stripe_customer_id

    const totalAmount = bodies.reduce((sum, b) => sum + Math.round(b.price * 100), 0)

    const intent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'eur',
      customer: customer,
      payment_method: providerMethod.provider_id,
      confirm: false,
    })

    return intent.client_secret!
  }

  async confirmOrder(userId: number, paymentIntentId: string, bodies: OrderBody[]): Promise<Order> {
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId)
    if (intent.status !== 'succeeded') {
      throw new Error('Payment not confirmed by Stripe')
    }

    const orderResult = await pool.query<OrderRaw>(
      `--sql
        INSERT INTO "order" (created_at, user_id, address_id, payment_method_id)
        VALUES (NOW(), $1, $2, $3)
        RETURNING *
      `,
      [userId, bodies[0].address_id, bodies[0].payment_method_id],
    )
    const order = orderResult.rows[0]

    for (const body of bodies) {
      const renewsAt = addLength(new Date(), body.length)
      const subResult = await pool.query<SubscriptionRaw>(
        `--sql
          INSERT INTO subscription (product_id, user_id, length, users, amount, price, active, renews_at)
          VALUES ($1, $2, $3, $4, $5, $6, true, $7)
          RETURNING *
        `,
        [body.product_id, userId, body.length, body.users, body.amount, body.price, renewsAt],
      )

      await pool.query(
        `--sql
          INSERT INTO order_subscription (order_id, subscription_id)
          VALUES ($1, $2)
        `,
        [order.id, subResult.rows[0].id],
      )
    }

    const orders = await this.findAllOrders(userId)
    return orders.find((o) => o.id === order.id)!
  }

  async reactivateSubscription(userId: number, subscriptionId: number) {
    const subscriptionResult = await pool.query<SubscriptionRaw>(
      `--sql
        SELECT * FROM subscription WHERE id = $1 AND user_id = $2 LIMIT 1
      `,
      [subscriptionId, userId],
    )

    const subscription = subscriptionResult.rows[0]
    if (!subscription) throw new Error('Subscription not found')

    const now = new Date()
    const isFuture = subscription.renews_at > now
    const base = isFuture ? subscription.renews_at : now

    await pool.query(
      `--sql
        UPDATE subscription
        SET active = true, renews_at = $1
        WHERE id = $2
      `,
      [base, subscriptionId],
    )

    if (!isFuture) await this.renewSubscription(subscriptionId)
  }

  async deactivateSubscription(userId: number, subscriptionId: number): Promise<void> {
    await pool.query(
      `--sql
        UPDATE subscription SET active = false
        WHERE id = $1 AND user_id = $2
      `,
      [subscriptionId, userId],
    )
  }

  async renewSubscription(subscriptionId: number) {
    const subscriptionResult = await pool.query<SubscriptionRaw>(`SELECT * FROM subscription WHERE id = $1 LIMIT 1`, [
      subscriptionId,
    ])
    const subscription = subscriptionResult.rows[0]
    if (!subscription) return false

    const lastOrderResult = await pool.query<LastOrderInfo>(
      `--sql
        SELECT
          o.id AS order_id,
          o.address_id,
          o.payment_method_id,
          pm.provider_id,
          a.active AS address_active,
          pm.active AS payment_method_active,
          p.active AS product_active,
          u.stripe_customer_id AS customer
        FROM "order" o
        JOIN order_subscription os ON os.order_id = o.id
        JOIN payment_method pm ON pm.id = o.payment_method_id
        JOIN address a ON a.id = o.address_id
        JOIN product p ON p.id = $2
        JOIN "user" u ON u.id = pm.user_id
        WHERE os.subscription_id = $1
        ORDER BY o.created_at DESC
        LIMIT 1
      `,
      [subscriptionId, subscription.product_id],
    )

    const lastOrder = lastOrderResult.rows[0]

    if (!lastOrder || !lastOrder.address_active || !lastOrder.payment_method_active || !lastOrder.product_active) {
      await this.deactivateSubscription(subscription.user_id, subscriptionId)
      return false
    }

    let intent: Stripe.PaymentIntent
    try {
      intent = await stripe.paymentIntents.create({
        amount: Math.round(subscription.price * 100),
        currency: 'eur',
        payment_method: lastOrder.provider_id,
        confirm: true,
        customer: lastOrder.customer,
        off_session: true,
        metadata: { subscription_id: String(subscriptionId) },
      })

      // error
    } catch (error) {
      console.error(`[renewal] payment failed for subscription ${subscriptionId}:`, error)
      await this.deactivateSubscription(subscription.user_id, subscriptionId)
      return false
    }

    if (intent.status !== 'succeeded') {
      await this.deactivateSubscription(subscription.user_id, subscriptionId)
      return false
    }

    const orderResult = await pool.query<{ id: number }>(
      `--sql
        INSERT INTO "order" (created_at, user_id, address_id, payment_method_id)
        VALUES (NOW(), $1, $2, $3)
        RETURNING id
      `,
      [subscription.user_id, lastOrder.address_id, lastOrder.payment_method_id],
    )

    await pool.query(`INSERT INTO order_subscription (order_id, subscription_id) VALUES ($1, $2)`, [
      orderResult.rows[0].id,
      subscriptionId,
    ])

    const newRenewsAt = addLength(new Date(), subscription.length)
    await pool.query(`UPDATE subscription SET active = true, renews_at = $1 WHERE id = $2`, [newRenewsAt, subscriptionId])

    return true
  }

  async runDueRenewals() {
    const result = await pool.query<{ id: number }>(
      `--sql
        SELECT id FROM subscription
        WHERE active = true
        AND renews_at <= NOW()
      `,
    )

    if (result.rows.length === 0) {
      console.log('[renewal] no subscriptions due for renewal')
      return
    }

    console.log(`[renewal] processing ${result.rows.length} subscriptions`)

    for (const row of result.rows) {
      try {
        const success = await this.renewSubscription(row.id)
        console.log(`[renewal] subscription ${row.id}: ${success ? 'renewed' : 'deactivated'}`)
      } catch (error) {
        console.error(`[renewal] unexpected error for subscription ${row.id}:`, error)
      }
    }
  }
}
