import { Request, Response } from 'express';
import { PaymentService } from '../service/payment.service';
import { PaymentMethod } from '../types/payment.types';

export default class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  async processPayment(req: Request, res: Response) {
    try {
      const { method, amount, currency, metadata } = req.body;
      
      if (!method || !Object.values(PaymentMethod).includes(method)) {
        return res.status(400).json({ error: 'Invalid payment method' });
      }

      if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
      }

      const payment = await this.paymentService.processPayment(
        method as PaymentMethod,
        amount,
        currency || 'EUR',
        metadata || {}
      );

      // Format response based on payment method
      let response;
      if (method === PaymentMethod.STRIPE) {
        response = {
          paymentId: payment.id,
          clientSecret: payment.client_secret,
          status: payment.status,
          amount: payment.amount,
          currency: payment.currency,
          method: PaymentMethod.STRIPE,
        };
      } else if (method === PaymentMethod.PAYPAL) {
        response = {
          paymentId: payment.id,
          approvalUrl: payment.links.find((link: any) => link.rel === 'approve')?.href,
          status: payment.status,
          amount: payment.purchase_units[0].amount.value,
          currency: payment.purchase_units[0].amount.currency_code,
          method: PaymentMethod.PAYPAL,
        };
      }

      res.status(200).json(response);
    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).json({ error: 'Failed to process payment', details: error instanceof Error ? error.message : String(error) });
    }
  }

  async getPaymentStatus(req: Request, res: Response) {
    try {
      const { method, paymentId } = req.query;
      
      if (!method || !Object.values(PaymentMethod).includes(method as string)) {
        return res.status(400).json({ error: 'Invalid payment method' });
      }

      if (!paymentId || typeof paymentId !== 'string') {
        return res.status(400).json({ error: 'Invalid payment ID' });
      }

      const status = await this.paymentService.getPaymentStatus(
        method as PaymentMethod,
        paymentId
      );

      res.status(200).json({
        paymentId,
        status,
        method,
      });
    } catch (error) {
      console.error('Error getting payment status:', error);
      res.status(500).json({ error: 'Failed to get payment status', details: error instanceof Error ? error.message : String(error) });
    }
  }

  async refundPayment(req: Request, res: Response) {
    try {
      const { method, paymentId, amount, reason } = req.body;
      
      if (!method || !Object.values(PaymentMethod).includes(method as string)) {
        return res.status(400).json({ error: 'Invalid payment method' });
      }

      if (!paymentId || typeof paymentId !== 'string') {
        return res.status(400).json({ error: 'Invalid payment ID' });
      }

      const refund = await this.paymentService.refundPayment(
        method as PaymentMethod,
        paymentId,
        amount
      );

      // Format response based on payment method
      let response;
      if (method === PaymentMethod.STRIPE) {
        response = {
          refundId: refund.id,
          paymentId: refund.payment_intent,
          amount: refund.amount / 100, // Convert from cents
          currency: refund.currency,
          status: refund.status,
          method: PaymentMethod.STRIPE,
        };
      } else if (method === PaymentMethod.PAYPAL) {
        response = {
          refundId: refund.id,
          paymentId: refund.capture_id,
          amount: refund.amount.value,
          currency: refund.amount.currency_code,
          status: refund.status,
          method: PaymentMethod.PAYPAL,
        };
      }

      res.status(200).json(response);
    } catch (error) {
      console.error('Error refunding payment:', error);
      res.status(500).json({ error: 'Failed to refund payment', details: error instanceof Error ? error.message : String(error) });
    }
  }

  async handleWebhook(req: Request, res: Response) {
    try {
      const { method } = req.params;
      const payload = req.body;
      const headers = req.headers;
      
      if (!method || !Object.values(PaymentMethod).includes(method as PaymentMethod)) {
        return res.status(400).json({ error: 'Invalid payment method' });
      }

      const isValid = await this.paymentService.handleWebhook(
        method as PaymentMethod,
        payload,
        headers
      );
      
      if (!isValid) {
        return res.status(400).json({ error: 'Invalid webhook signature' });
      }

      // Webhook handled successfully
      res.status(200).json({ received: true });
    } catch (error) {
      console.error('Error handling webhook:', error);
      res.status(500).json({ error: 'Failed to handle webhook', details: error instanceof Error ? error.message : String(error) });
    }
  }
}