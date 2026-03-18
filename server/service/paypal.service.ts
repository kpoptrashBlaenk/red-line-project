import axios from 'axios';
import querystring from 'querystring';
import dotenv from 'dotenv';

dotenv.config();

export class PayPalService {
  private clientId: string;
  private clientSecret: string;
  private baseUrl: string;
  private accessToken: string;
  private tokenExpiry: number;

  constructor() {
    this.clientId = process.env.PAYPAL_CLIENT_ID!;
    this.clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
    this.baseUrl = process.env.PAYPAL_API_URL || 'https://api.sandbox.paypal.com';
    this.accessToken = '';
    this.tokenExpiry = 0;
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
      const response = await axios.post(
        `${this.baseUrl}/v1/oauth2/token`,
        querystring.stringify({ grant_type: 'client_credentials' }),
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);

      return this.accessToken;
    } catch (error) {
      console.error('Error getting PayPal access token:', error);
      throw error;
    }
  }

  private async makeRequest(method: 'get' | 'post' | 'patch' | 'put' | 'delete', endpoint: string, data: any = null): Promise<any> {
    try {
      const accessToken = await this.getAccessToken();
      const url = `${this.baseUrl}${endpoint}`;

      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      };

      let response;
      switch (method) {
        case 'get':
          response = await axios.get(url, config);
          break;
        case 'post':
          response = await axios.post(url, data, config);
          break;
        case 'patch':
          response = await axios.patch(url, data, config);
          break;
        case 'put':
          response = await axios.put(url, data, config);
          break;
        case 'delete':
          response = await axios.delete(url, config);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }

      return response.data;
    } catch (error) {
      console.error(`Error making PayPal ${method} request to ${endpoint}:`, error);
      throw error;
    }
  }

  async createOrder(amount: number, currency: string = 'EUR', description: string = 'Payment', returnUrl: string, cancelUrl: string): Promise<any> {
    try {
      const orderData = {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toFixed(2),
            },
            description: description,
          },
        ],
        application_context: {
          return_url: returnUrl,
          cancel_url: cancelUrl,
          brand_name: 'Your Brand Name',
          landing_page: 'BILLING',
          user_action: 'PAY_NOW',
        },
      };

      return await this.makeRequest('post', '/v2/checkout/orders', orderData);
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      throw error;
    }
  }

  async captureOrder(orderId: string): Promise<any> {
    try {
      return await this.makeRequest('post', `/v2/checkout/orders/${orderId}/capture`);
    } catch (error) {
      console.error('Error capturing PayPal order:', error);
      throw error;
    }
  }

  async getOrder(orderId: string): Promise<any> {
    try {
      return await this.makeRequest('get', `/v2/checkout/orders/${orderId}`);
    } catch (error) {
      console.error('Error getting PayPal order:', error);
      throw error;
    }
  }

  async createRefund(captureId: string, amount?: number): Promise<any> {
    try {
      const refundData: any = {
        capture_id: captureId,
      };

      if (amount) {
        refundData.amount = {
          currency_code: 'EUR',
          value: amount.toFixed(2),
        };
        refundData.invoice_id = `INV-${Date.now()}`;
      }

      return await this.makeRequest('post', '/v2/payments/refunds', refundData);
    } catch (error) {
      console.error('Error creating PayPal refund:', error);
      throw error;
    }
  }

  async verifyWebhookSignature(eventBody: any, headers: any): Promise<boolean> {
    try {
      // PayPal webhook verification would typically involve:
      // 1. Getting the webhook ID from headers
      // 2. Getting the transmission ID, timestamp, and signature from headers
      // 3. Reconstructing the message
      // 4. Verifying the signature using PayPal's public certificate

      // For simplicity, we'll do basic validation here
      // In production, you should implement full signature verification

      const webhookId = headers['paypal-webhook-id'];
      const expectedWebhookId = process.env.PAYPAL_WEBHOOK_ID;

      if (!webhookId || webhookId !== expectedWebhookId) {
        console.warn('Invalid PayPal webhook ID');
        return false;
      }

      // Additional verification would go here
      return true;
    } catch (error) {
      console.error('Error verifying PayPal webhook signature:', error);
      return false;
    }
  }
}