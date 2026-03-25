import { urls } from '$/constants/apiUrl'
import { Router } from 'express'
import OrderController from '../controller/order.controller'
import { authMiddleware } from '../middleware/auth'

const router = Router()
const controller = new OrderController()

router.get(urls.order_get_all, authMiddleware, controller.getOrders)
router.get(urls.subscription_get_all, authMiddleware, controller.getSubscriptions)
router.post(urls.order_create_intent, authMiddleware, controller.createIntent)
router.post(urls.order_confirm, authMiddleware, controller.confirm)
router.post(urls.subscription_reactivate, authMiddleware, controller.reactivateSubscription)
router.post(urls.subscription_deactivate, authMiddleware, controller.deactivateSubscription)

export default router
