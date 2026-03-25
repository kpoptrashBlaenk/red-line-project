import { urls } from '$/constants/apiUrl'
import { Router } from 'express'
import PaymentMethodController from '../controller/payment.controller'
import { authMiddleware } from '../middleware/auth'

const router = Router()
const controller = new PaymentMethodController()

router.get(urls.payment_method_get_all, authMiddleware, controller.getAll)
router.post(urls.payment_method_create, authMiddleware, controller.create)
router.delete(urls.payment_method_delete, authMiddleware, controller.delete)

export default router
