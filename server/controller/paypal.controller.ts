import { Request, Response } from 'express';
import { PayPalService } from '../service/paypal.service';

export default class PayPalController {
  private paypalService: PayPalService;

  constructor() {
    this.paypalService = new PayPalService();
  }

  async createOrder(req: Request, res: Response) {
    try {
      const { amount, currency, description, returnUrl, cancelUrl } = req.body;
      
      if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
      }

      if (!returnUrl || !cancelUrl) {
        return res.status(400).json({ error: 'Return URL and Cancel URL are required' });
      }

      const order = await this.paypalService.createOrder(
        amount,
        currency || 'EUR',
        description || 'Payment',
        returnUrl,
        cancelUrl
      );

      res.status(200).json({
        orderId: order.id,
        status: order.status,
        approvalUrl: order.links.find((link: any) => link.rel === 'approve')?.href,
        amount: order.purchase_units[0].amount,
        currency: order.purchase_units[0].amount.currency_code,
      });
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      res.status(500).json({ error: 'Failed to create PayPal order', details: error instanceof Error ? error.message : String(error) });
    }
  }

  async captureOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      
      if (!orderId) {
        return res.status(400).json({ error: 'Order ID is required' });
      }

      const capture = await this.paypalService.captureOrder(orderId);

      res.status(200).json({
        captureId: capture.id,
        status: capture.status,
        amount: capture.purchase_units[0].payments.captures[0].amount,
        currency: capture.purchase_units[0].payments.captures[0].amount.currency_code,
        paymentStatus: capture.purchase_units[0].payments.captures[0].status,
      });
    } catch (error) {
      console.error('Error capturing PayPal order:', error);
      res.status(500).json({ error: 'Failed to capture PayPal order', details: error instanceof Error ? error.message : String(error) });
    }
  }

  async getOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      
      if (!orderId) {
        return res.status(400).json({ error: 'Order ID is required' });
      }

      const order = await this.paypalService.getOrder(orderId);

      res.status(200).json({
        orderId: order.id,
        status: order.status,
        amount: order.purchase_units[0].amount,
        currency: order.purchase_units[0].amount.currency_code,
        createTime: order.create_time,
        updateTime: order.update_time,
      });
    } catch (error) {
      console.error('Error getting PayPal order:', error);
      res.status(500).json({ error: 'Failed to get PayPal order', details: error instanceof Error ? error.message : String(error) });
    }
  }

  async createRefund(req: Request, res: Response) {
    try {
      const { captureId, amount } = req.body;
      
      if (!captureId) {
        return res.status(400).json({ error: 'Capture ID is required' });
      }

      const refund = await this.paypalService.createRefund(captureId, amount);

      res.status(200).json({
        refundId: refund.id,
        status: refund.status,
        amount: refund.amount,
        currency: refund.amount.currency_code,
        captureId: refund.capture_id,
      });
    } catch (error) {
      console.error('Error creating PayPal refund:', error);
      res.status(500).json({ error: 'Failed to create PayPal refund', details: error instanceof Error ? error.message : String(error) });
    }
  }

  async handleWebhook(req: Request, res: Response) {
    try {
      const headers = req.headers;
      const eventBody = req.body;
      
      const isValid = await this.paypalService.verifyWebhookSignature(eventBody, headers);
      
      if (!isValid) {
        return res.status(400).json({ error: 'Invalid webhook signature' });
      }

      // Handle different webhook events
      const eventType = headers['paypal-event-type'] as string;
      
      switch (eventType) {
        case 'CHECKOUT.ORDER.APPROVED':
          console.log('PayPal order approved:', eventBody);
          // Add your business logic here (e.g., reserve items in inventory)
          break;
        case 'PAYMENT.CAPTURE.COMPLETED':
          console.log('PayPal payment captured:', eventBody);
          // Add your business logic here (e.g., fulfill order, send confirmation)
          break;
        case 'PAYMENT.CAPTURE.REFUNDED':
          console.log('PayPal payment refunded:', eventBody);
          // Add your business logic here
          break;
        default:
          console.log('Unhandled PayPal event type:', eventType);
      }

      res.status(200).json({ received: true });
    } catch (error) {
      console.error('Error handling PayPal webhook:', error);
      res.status(500).json({ error: 'Failed to handle PayPal webhook', details: error instanceof Error ? error.message : String(error) });
    }
  }
}