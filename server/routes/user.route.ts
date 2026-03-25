import { urls } from '$/constants/apiUrl'
import { Router } from 'express'
import UserController from '../controller/user.controller'
import { authMiddleware } from '#/middleware/auth'

const router = Router()
const controller = new UserController()

router.put(urls.user_modify_name, authMiddleware, controller.modifyName)
router.put(urls.user_modify_phone, authMiddleware, controller.modifyPhone)
router.put(urls.user_modify_email, authMiddleware, controller.modifyEmail)

export default router
