import { urls } from '$/constants/apiUrl'
import { Router } from 'express'
import PromotionController from '../controller/promotion.controller'
import upload from '#/middleware/upload'

const router = Router()
const controller = new PromotionController()

router.put(urls.promotion_reorder, controller.reorder) // need to come before update
router.get(urls.promotion_get_all, controller.getAll)
router.post(urls.promotion_create, upload.array('image'), controller.create)
router.put(urls.promotion_update, upload.array('image'), controller.update)
router.delete(urls.promotion_delete, controller.delete)

export default router
