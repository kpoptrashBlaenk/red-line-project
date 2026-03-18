import { Router } from 'express';
import PaymentController from '../controller/payment.controller';

const router = Router();
const controller = new PaymentController();

// Unified payment processing endpoint
router.post('/process', controller.processPayment);

// Payment status endpoint
router.get('/status', controller.getPaymentStatus);

// Refund endpoint
router.post('/refund', controller.refundPayment);

// Webhook endpoints for different payment methods
router.post('/webhook/:method', controller.handleWebhook);

export default router;