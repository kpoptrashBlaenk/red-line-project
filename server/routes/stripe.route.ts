import { Router } from 'express';
import StripeController from '../controller/stripe.controller';

const router = Router();
const controller = new StripeController();

// Payment Intent routes
router.post('/payment-intents', controller.createPaymentIntent);
router.post('/payment-intents/:paymentIntentId/confirm', controller.confirmPaymentIntent);
router.post('/payment-intents/:paymentIntentId/cancel', controller.cancelPaymentIntent);
router.get('/payment-intents/:paymentIntentId', controller.getPaymentIntent);

// Refund routes
router.post('/refunds', controller.createRefund);

// Webhook route
router.post('/webhook', controller.handleWebhook);

export default router;