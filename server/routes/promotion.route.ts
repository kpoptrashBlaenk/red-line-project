import { Router } from 'express'
import PromotionController from '../controller/promotion.controller'

const router = Router()
const controller = new PromotionController()

router.get('/promotionals', controller.getAll)

export default router
