import { pool } from '#/app'
import { OrderRaw, SubscriptionRaw } from '#/types/database'
import { Order, OrderBody, Subscription } from '$/types'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

function addLength(date: Date, length: string): Date {
  const next = new Date(date)
  if (length === 'monthly') next.setMonth(next.getMonth() + 1)
  else if (length === 'yearly') next.setFullYear(next.getFullYear() + 1)
  return next
}

function nextRenewsAt(currentRenewsAt: Date, length: string): Date {
  const now = new Date()
  const base = currentRenewsAt > now ? currentRenewsAt : now
  return addLength(base, length)
}

export class OrderService {
  async findAllOrders(userId: number): Promise<Order[]> {
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
                  WHEN s.active = true THEN 'active'
                  WHEN EXISTS (
                    SELECT 1 FROM order_subscription os2
                    JOIN "order" o2 ON o2.id = os2.order_id
                    WHERE os2.subscription_id = s.id AND o2.created_at > o.created_at
                  ) THEN 'renewed'
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

  async findAllSubscriptions(userId: number): Promise<Subscription[]> {
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
            'top', p.top, 'priority', p.priority, 'index', p.index,
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
    return result.rows
  }

  async findLastPaymentMethodForSubscription(subscriptionId: number, userId: number): Promise<string | null> {
    const result = await pool.query<{ provider_id: string }>(
      `--sql
        SELECT pm.provider_id
        FROM "order" o
        JOIN order_subscription os ON os.order_id = o.id
        JOIN payment_method pm ON pm.id = o.payment_method_id
        WHERE os.subscription_id = $1
        ORDER BY o.created_at DESC
        LIMIT 1
      `,
      [subscriptionId],
    )

    if (result.rows[0]) return result.rows[0].provider_id

    const fallback = await pool.query<{ provider_id: string }>(
      `--sql
        SELECT pm.provider_id
        FROM payment_method pm
        WHERE pm.user_id = $1
        ORDER BY pm.id DESC
        LIMIT 1
      `,
      [userId],
    )

    return fallback.rows[0]?.provider_id ?? null
  }

  async createIntent(userId: number, bodies: OrderBody[]): Promise<string> {
    const pmResult = await pool.query<{ provider_id: string }>(
      `--sql
        SELECT provider_id FROM payment_method WHERE id = $1 AND user_id = $2 LIMIT 1
      `,
      [bodies[0].payment_method_id, userId],
    )

    const providerMethod = pmResult.rows[0]
    if (!providerMethod) throw new Error('Payment method not found')

    const userResult = await pool.query<{ stripe_customer_id: string }>(
      `SELECT stripe_customer_id FROM "user" WHERE id = $1 LIMIT 1`,
      [userId],
    )

    const totalAmount = bodies.reduce((sum, b) => sum + Math.round(b.price * 100), 0)

    const intent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'eur',
      customer: userResult.rows[0].stripe_customer_id,
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

  async reactivateSubscription(
    userId: number,
    subscriptionId: number,
  ): Promise<{ requires_action: boolean; client_secret?: string }> {
    const subResult = await pool.query<SubscriptionRaw>(
      `--sql
        SELECT * FROM subscription WHERE id = $1 AND user_id = $2 LIMIT 1
      `,
      [subscriptionId, userId],
    )

    const subscription = subResult.rows[0]
    if (!subscription) throw new Error('Subscription not found')

    const providerId = await this.findLastPaymentMethodForSubscription(subscriptionId, userId)
    if (!providerId) throw new Error('No payment method found')

    const pmResult = await pool.query<{ id: number }>(
      `--sql
        SELECT id FROM payment_method WHERE provider_id = $1 AND user_id = $2 LIMIT 1
      `,
      [providerId, userId],
    )
    const paymentMethodId = pmResult.rows[0]?.id
    if (!paymentMethodId) throw new Error('Payment method not found in DB')

    // Charge directly in the background — no frontend 3DS
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(subscription.price * 100),
      currency: 'eur',
      payment_method: providerId,
      confirm: true,
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
    })

    if (intent.status === 'requires_action') {
      return { requires_action: true, client_secret: intent.client_secret! }
    }

    if (intent.status !== 'succeeded') {
      throw new Error('Payment failed')
    }

    const addressResult = await pool.query<{ address_id: number }>(
      `--sql
        SELECT o.address_id
        FROM "order" o
        JOIN order_subscription os ON os.order_id = o.id
        WHERE os.subscription_id = $1
        ORDER BY o.created_at DESC
        LIMIT 1
      `,
      [subscriptionId],
    )
    const addressId = addressResult.rows[0]?.address_id
    if (!addressId) throw new Error('No previous address found')

    await this.createRenewalOrder(userId, subscriptionId, subscription, addressId, paymentMethodId)

    return { requires_action: false }
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

  async modifySubscription(
    userId: number,
    subscriptionId: number,
    body: { length: string; users: string; amount: number },
  ): Promise<void> {
    await pool.query(
      `--sql
        UPDATE subscription
        SET length = $1, users = $2, amount = $3
        WHERE id = $4 AND user_id = $5
      `,
      [body.length, body.users, body.amount, subscriptionId, userId],
    )
  }

  private async createRenewalOrder(
    userId: number,
    subscriptionId: number,
    subscription: SubscriptionRaw,
    addressId: number,
    paymentMethodId: number,
  ): Promise<void> {
    const orderResult = await pool.query<OrderRaw>(
      `--sql
        INSERT INTO "order" (created_at, user_id, address_id, payment_method_id)
        VALUES (NOW(), $1, $2, $3)
        RETURNING *
      `,
      [userId, addressId, paymentMethodId],
    )

    await pool.query(
      `--sql
        INSERT INTO order_subscription (order_id, subscription_id)
        VALUES ($1, $2)
      `,
      [orderResult.rows[0].id, subscriptionId],
    )

    const newRenewsAt = nextRenewsAt(subscription.renews_at, subscription.length)
    await pool.query(
      `--sql
        UPDATE subscription
        SET active = true, renews_at = $1
        WHERE id = $2
      `,
      [newRenewsAt, subscriptionId],
    )
  }
}
