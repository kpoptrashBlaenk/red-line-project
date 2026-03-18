import { StripeService } from './stripe.service';
import { PayPalService } from './paypal.service';
import { PaymentMethod, PaymentStatus } from '../types/payment.types';

export class PaymentService {
  private stripeService: StripeService;
  private paypalService: PayPalService;

  constructor() {
    this.stripeService = new StripeService();
    this.paypalService = new PayPalService();
  }

  async processPayment(
    method: PaymentMethod,
    amount: number,
    currency: string,
    metadata: any = {}
  ): Promise<any> {
    try {
      switch (method) {
        case PaymentMethod.STRIPE:
          return await this.stripeService.createPaymentIntent(amount, currency, metadata);
        case PaymentMethod.PAYPAL:
          // For PayPal, we need return and cancel URLs
          const returnUrl = metadata.returnUrl || 'http://localhost:8100/payment-success';
          const cancelUrl = metadata.cancelUrl || 'http://localhost:8100/payment-cancel';
          return await this.paypalService.createOrder(amount, currency, metadata.description || 'Payment', returnUrl, cancelUrl);
        default:
          throw new Error('Unsupported payment method');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }

  async getPaymentStatus(method: PaymentMethod, paymentId: string): Promise<PaymentStatus> {
    try {
      switch (method) {
        case PaymentMethod.STRIPE:
          const stripePayment = await this.stripeService.getPaymentIntent(paymentId);
          return stripePayment.status as PaymentStatus;
        case PaymentMethod.PAYPAL:
          const paypalOrder = await this.paypalService.getOrder(paymentId);
          return paypalOrder.status as PaymentStatus;
        default:
          throw new Error('Unsupported payment method');
      }
    } catch (error) {
      console.error('Error getting payment status:', error);
      throw error;
    }
  }

  async refundPayment(method: PaymentMethod, paymentId: string, amount?: number): Promise<any> {
    try {
      switch (method) {
        case PaymentMethod.STRIPE:
          return await this.stripeService.createRefund(paymentId, amount);
        case PaymentMethod.PAYPAL:
          // For PayPal, we need to get the capture ID first
          const order = await this.paypalService.getOrder(paymentId);
          const captureId = order.purchase_units[0].payments.captures[0].id;
          return await this.paypalService.createRefund(captureId, amount);
        default:
          throw new Error('Unsupported payment method');
      }
    } catch (error) {
      console.error('Error refunding payment:', error);
      throw error;
    }
  }

  async handleWebhook(method: PaymentMethod, payload: any, headers: any): Promise<boolean> {
    try {
      switch (method) {
        case PaymentMethod.STRIPE:
          const signature = headers['stripe-signature'];
          return await this.stripeService.verifyWebhookSignature(JSON.stringify(payload), signature);
        case PaymentMethod.PAYPAL:
          return await this.paypalService.verifyWebhookSignature(payload, headers);
        default:
          throw new Error('Unsupported payment method');
      }
    } catch (error) {
      console.error('Error handling webhook:', error);
      throw error;
    }
  }
}