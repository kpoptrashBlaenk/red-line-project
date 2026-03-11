import { urls } from '$/constants/apiUrl'
import { Router } from 'express'
import PromotionController from '../controller/promotion.controller'

const router = Router()
const controller = new PromotionController()

router.get(urls.promotion, controller.getAll)

export default router
