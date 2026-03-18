import { Request, Response } from 'express';
import { StripeService } from '../service/stripe.service';

export default class StripeController {
  private stripeService: StripeService;

  constructor() {
    this.stripeService = new StripeService();
  }

  async createPaymentIntent(req: Request, res: Response) {
    try {
      const { amount, currency, metadata } = req.body;
      
      if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
      }

      const paymentIntent = await this.stripeService.createPaymentIntent(
        amount,
        currency || 'eur',
        metadata || {}
      );

      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
      });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ error: 'Failed to create payment intent', details: error instanceof Error ? error.message : String(error) });
    }
  }

  async confirmPaymentIntent(req: Request, res: Response) {
    try {
      const { paymentIntentId } = req.body;
      
      if (!paymentIntentId) {
        return res.status(400).json({ error: 'Payment intent ID is required' });
      }

      const paymentIntent = await this.stripeService.confirmPaymentIntent(paymentIntentId);

      res.status(200).json({
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        paymentMethod: paymentIntent.payment_method,
      });
    } catch (error) {
      console.error('Error confirming payment intent:', error);
      res.status(500).json({ error: 'Failed to confirm payment intent', details: error instanceof Error ? error.message : String(error) });
    }
  }

  async cancelPaymentIntent(req: Request, res: Response) {
    try {
      const { paymentIntentId } = req.body;
      
      if (!paymentIntentId) {
        return res.status(400).json({ error: 'Payment intent ID is required' });
      }

      const paymentIntent = await this.stripeService.cancelPaymentIntent(paymentIntentId);

      res.status(200).json({
        status: paymentIntent.status,
        cancellationReason: paymentIntent.cancellation_reason,
      });
    } catch (error) {
      console.error('Error canceling payment intent:', error);
      res.status(500).json({ error: 'Failed to cancel payment intent', details: error instanceof Error ? error.message : String(error) });
    }
  }

  async getPaymentIntent(req: Request, res: Response) {
    try {
      const { paymentIntentId } = req.params;
      
      if (!paymentIntentId) {
        return res.status(400).json({ error: 'Payment intent ID is required' });
      }

      const paymentIntent = await this.stripeService.getPaymentIntent(paymentIntentId);

      res.status(200).json({
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        created: paymentIntent.created,
        metadata: paymentIntent.metadata,
      });
    } catch (error) {
      console.error('Error retrieving payment intent:', error);
      res.status(500).json({ error: 'Failed to retrieve payment intent', details: error instanceof Error ? error.message : String(error) });
    }
  }

  async createRefund(req: Request, res: Response) {
    try {
      const { paymentIntentId, amount } = req.body;
      
      if (!paymentIntentId) {
        return res.status(400).json({ error: 'Payment intent ID is required' });
      }

      const refund = await this.stripeService.createRefund(paymentIntentId, amount);

      res.status(200).json({
        id: refund.id,
        amount: refund.amount,
        currency: refund.currency,
        status: refund.status,
        paymentIntent: refund.payment_intent,
      });
    } catch (error) {
      console.error('Error creating refund:', error);
      res.status(500).json({ error: 'Failed to create refund', details: error instanceof Error ? error.message : String(error) });
    }
  }

  async handleWebhook(req: Request, res: Response) {
    try {
      const signature = req.headers['stripe-signature'] as string;
      const payload = req.body;
      
      if (!signature) {
        return res.status(400).json({ error: 'Missing stripe-signature header' });
      }

      const isValid = await this.stripeService.verifyWebhookSignature(
        JSON.stringify(payload),
        signature
      );
      
      if (!isValid) {
        return res.status(400).json({ error: 'Invalid webhook signature' });
      }

      // Handle different webhook events
      const event = payload;
      
      switch (event.type) {
        case 'payment_intent.succeeded':
          console.log('Payment succeeded:', event.data.object);
          // Add your business logic here (e.g., update database, send confirmation email)
          break;
        case 'payment_intent.payment_failed':
          console.log('Payment failed:', event.data.object);
          // Add your business logic here
          break;
        case 'charge.refunded':
          console.log('Charge refunded:', event.data.object);
          // Add your business logic here
          break;
        default:
          console.log('Unhandled event type:', event.type);
      }

      res.status(200).json({ received: true });
    } catch (error) {
      console.error('Error handling webhook:', error);
      res.status(500).json({ error: 'Failed to handle webhook', details: error instanceof Error ? error.message : String(error) });
    }
  }
}