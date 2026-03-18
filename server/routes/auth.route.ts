import { Router } from 'express';
import AuthController from '../controller/auth.controller';

const router = Router();
const controller = new AuthController();


router.post('/forgot-password', controller.requestPasswordReset);
router.get('/validate-reset-token', controller.validatePasswordResetToken);
router.post('/reset-password', controller.resetPassword);

export default router;