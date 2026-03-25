import { urls } from '$/constants/apiUrl'
import { Router } from 'express'
import CategoryController from '../controller/category.controller'
import upload from '#/middleware/upload'

const router = Router()
const controller = new CategoryController()

router.put(urls.category_reorder, controller.reorder) // must come before update
router.get(urls.category_get_all, controller.getAll)
router.get(urls.category_get_by_id, controller.getById)
router.post(urls.category_create, upload.array('image'), controller.create)
router.put(urls.category_update, upload.array('image'), controller.update)
router.delete(urls.category_delete, controller.delete)

export default router
