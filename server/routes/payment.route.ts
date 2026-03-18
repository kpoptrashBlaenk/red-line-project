import { Router } from 'express';
import PaymentController from '../controller/payment.controller';

const router = Router();
const controller = new PaymentController();


router.post('/stripe/create-payment-intent', controller.createStripePaymentIntent);
router.post('/stripe/confirm-payment', controller.confirmStripePayment);
router.post('/stripe/customers', controller.createStripeCustomer);
router.post('/stripe/attach-payment-method', controller.attachPaymentMethod);


router.post('/paypal/create-order', controller.createPayPalOrder);
router.post('/paypal/capture-order', controller.capturePayPalOrder);


router.post('/stripe/webhook', controller.handleStripeWebhook);

export default router;
