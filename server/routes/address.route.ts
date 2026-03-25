import { urls } from '$/constants/apiUrl'
import { Router } from 'express'
import AddressController from '../controller/address.controller'
import { authMiddleware } from '../middleware/auth'

const router = Router()
const controller = new AddressController()

router.get(urls.address_get_all, authMiddleware, controller.getAll)
router.post(urls.address_create, authMiddleware, controller.create)
router.put(urls.address_update, authMiddleware, controller.update)
router.delete(urls.address_delete, authMiddleware, controller.delete)

export default router
