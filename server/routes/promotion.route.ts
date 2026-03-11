import { urls } from '$/constants/apiUrl'
import { Router } from 'express'
import PromotionController from '../controller/promotion.controller'

const router = Router()
const controller = new PromotionController()

router.get(urls.promotion_get_all, controller.getAll)
router.post(urls.promotion_create, controller.create)
router.put(urls.promotion_update, controller.update)
router.delete(urls.promotion_delete, controller.delete)

export default router
