import { urls } from '$/constants/apiUrl'
import { Router } from 'express'
import ProductController from '../controller/product.controller'
import upload from '#/middleware/upload'

const router = Router()
const controller = new ProductController()

router.put(urls.product_reorder, controller.reorder) // must be before :id
router.get(urls.product_get_all, controller.getAll)
router.get(urls.product_get_top, controller.getTop)
router.get(urls.product_get_by_category, controller.getByCategory)
router.get(urls.product_get_by_id, controller.getById)

router.post(urls.product_create, upload.array('image'), controller.create)
router.put(urls.product_update, upload.array('image'), controller.update)
router.delete(urls.product_delete, controller.delete)

export default router
