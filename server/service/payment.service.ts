import Stripe from 'stripe';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export class PaymentService {
  private stripe: Stripe;
  private paypalAccessToken: string | null;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-10-16' as any,
    });

    this.paypalAccessToken = null;
  }


  private async getPayPalAccessToken(): Promise<string> {
    try {
      if (this.paypalAccessToken) {
        return this.paypalAccessToken;
      }

      const auth = Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
      ).toString('base64');

      const response = await axios.post(
        `${process.env.PAYPAL_API_URL || 'https://api.sandbox.paypal.com'}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      this.paypalAccessToken = response.data.access_token as string;
      return this.paypalAccessToken;
    } catch (error: any) {
      console.error('Error getting PayPal access token:', error.message);
      throw error;
    }
  }

  private async paypalRequest(endpoint: string, method: string = 'GET', data: any = null) {
    try {
      const accessToken = await this.getPayPalAccessToken();
      const baseUrl = process.env.PAYPAL_API_URL || 'https://api.sandbox.paypal.com';

      const response = await axios({
        method: method,
        url: `${baseUrl}${endpoint}`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        data: data,
      });

      return response.data;
    } catch (error: any) {
      console.error('PayPal API error:', error.message);
      throw error;
    }
  }



  async createStripePaymentIntent(amount: number, currency: string = 'eur', metadata: any = {}) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: currency.toLowerCase(),
        metadata: metadata,
      });

      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
      };
    } catch (error) {
      console.error('Error creating Stripe payment intent:', error);
      throw error;
    }
  }

  async confirmStripePayment(paymentIntentId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status !== 'succeeded') {
        throw new Error(`Payment not successful. Status: ${paymentIntent.status}`);
      }

      return {
        success: true,
        paymentIntent,
      };
    } catch (error) {
      console.error('Error confirming Stripe payment:', error);
      throw error;
    }
  }

  async createStripeCustomer(email: string, name?: string, metadata: any = {}) {
    try {
      const customer = await this.stripe.customers.create({
        email: email,
        name: name,
        metadata: metadata,
      });

      return customer;
    } catch (error) {
      console.error('Error creating Stripe customer:', error);
      throw error;
    }
  }

  async attachPaymentMethodToCustomer(customerId: string, paymentMethodId: string) {
    try {
      const paymentMethod = await this.stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });


      await this.stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      return paymentMethod;
    } catch (error) {
      console.error('Error attaching payment method:', error);
      throw error;
    }
  }



  async createPayPalOrder(amount: number, currency: string = 'EUR', description: string = 'Payment') {
    try {
      const orderData = {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          description: description,
        }],
      };

      const order = await this.paypalRequest('/v2/checkout/orders', 'POST', orderData);

      return {
        id: order.id,
        status: order.status,
        intent: order.intent,
        purchase_units: order.purchase_units,
        links: order.links,
      };
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      throw error;
    }
  }

  async capturePayPalOrder(orderId: string) {
    try {
      const order = await this.paypalRequest(`/v2/checkout/orders/${orderId}/capture`, 'POST');

      const capture = order.purchase_units[0].payments.captures[0];

      if (capture.status !== 'COMPLETED') {
        throw new Error(`Payment not completed. Status: ${capture.status}`);
      }

      return {
        success: true,
        captureId: capture.id,
        amount: capture.amount.value,
        currency: capture.amount.currency_code,
        status: capture.status,
        orderId: order.id,
      };
    } catch (error) {
      console.error('Error capturing PayPal order:', error);
      throw error;
    }
  }


  async handleStripeWebhook(payload: Buffer, signature: string) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      );

      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          console.log('PaymentIntent was successful!', paymentIntent.id);

          break;
        case 'payment_intent.payment_failed':
          const failedPaymentIntent = event.data.object;
          console.log('PaymentIntent failed!', failedPaymentIntent.id);

          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      return { received: true };
    } catch (error) {
      console.error('Error handling Stripe webhook:', error);
      throw error;
    }
  }
}