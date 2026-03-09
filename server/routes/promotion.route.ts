import { Router } from 'express'
import PromotionController from '../controller/promotion.controller'

const router = Router()
const controller = new PromotionController()

router.get('/promotionals', controller.getAll)
router.get('/promotionals/:id', controller.getById)
router.post('/promotionals', controller.create)
router.put('/promotionals/:id', controller.update)
router.delete('/promotionals/:id', controller.delete)

export default router

