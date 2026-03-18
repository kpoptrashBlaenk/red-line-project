import { Router } from 'express';
import PayPalController from '../controller/paypal.controller';

const router = Router();
const controller = new PayPalController();

// Order routes
router.post('/orders', controller.createOrder);
router.post('/orders/:orderId/capture', controller.captureOrder);
router.get('/orders/:orderId', controller.getOrder);

// Refund routes
router.post('/refunds', controller.createRefund);

// Webhook route
router.post('/webhook', controller.handleWebhook);

export default router;