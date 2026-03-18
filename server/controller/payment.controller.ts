import { Request, Response } from 'express';
import { PaymentService } from '../service/payment.service';

export default class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }



  async createStripePaymentIntent(req: Request, res: Response) {
    try {
      const { amount, currency, metadata } = req.body;

      if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
      }

      const paymentIntent = await this.paymentService.createStripePaymentIntent(
        amount,
        currency || 'eur',
        metadata || {}
      );

      res.status(200).json(paymentIntent);
    } catch (error) {
      console.error('Error creating Stripe payment intent:', error);
      res.status(500).json({ error: 'Failed to create payment intent' });
    }
  }

  async confirmStripePayment(req: Request, res: Response) {
    try {
      const { paymentIntentId } = req.body;

      if (!paymentIntentId || typeof paymentIntentId !== 'string') {
        return res.status(400).json({ error: 'Invalid payment intent ID' });
      }

      const result = await this.paymentService.confirmStripePayment(paymentIntentId);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error confirming Stripe payment:', error);
      res.status(500).json({ error: 'Failed to confirm payment' });
    }
  }

  async createStripeCustomer(req: Request, res: Response) {
    try {
      const { email, name, metadata } = req.body;

      if (!email || typeof email !== 'string' || !this.isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
      }

      const customer = await this.paymentService.createStripeCustomer(
        email,
        name,
        metadata || {}
      );

      res.status(200).json(customer);
    } catch (error) {
      console.error('Error creating Stripe customer:', error);
      res.status(500).json({ error: 'Failed to create customer' });
    }
  }

  async attachPaymentMethod(req: Request, res: Response) {
    try {
      const { customerId, paymentMethodId } = req.body;

      if (!customerId || typeof customerId !== 'string') {
        return res.status(400).json({ error: 'Invalid customer ID' });
      }

      if (!paymentMethodId || typeof paymentMethodId !== 'string') {
        return res.status(400).json({ error: 'Invalid payment method ID' });
      }

      const paymentMethod = await this.paymentService.attachPaymentMethodToCustomer(
        customerId,
        paymentMethodId
      );

      res.status(200).json(paymentMethod);
    } catch (error) {
      console.error('Error attaching payment method:', error);
      res.status(500).json({ error: 'Failed to attach payment method' });
    }
  }

  

  async createPayPalOrder(req: Request, res: Response) {
    try {
      const { amount, currency, description } = req.body;

      if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
      }

      const order = await this.paymentService.createPayPalOrder(
        amount,
        currency || 'EUR',
        description || 'Payment'
      );

      res.status(200).json(order);
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      res.status(500).json({ error: 'Failed to create PayPal order' });
    }
  }

  async capturePayPalOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.body;

      if (!orderId || typeof orderId !== 'string') {
        return res.status(400).json({ error: 'Invalid order ID' });
      }

      const result = await this.paymentService.capturePayPalOrder(orderId);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error capturing PayPal order:', error);
      res.status(500).json({ error: 'Failed to capture PayPal order' });
    }
  }

  // Webhook Endpoints

  async handleStripeWebhook(req: Request, res: Response) {
    try {
      const signature = req.headers['stripe-signature'] as string;
      const payload = req.body;

      if (!signature) {
        return res.status(400).json({ error: 'Missing stripe-signature header' });
      }

      const result = await this.paymentService.handleStripeWebhook(
        Buffer.from(JSON.stringify(payload)),
        signature
      );

      res.status(200).json(result);
    } catch (error) {
      console.error('Error handling Stripe webhook:', error);
      res.status(400).json({ error: 'Invalid webhook signature' });
    }
  }

  // Utility Methods

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}