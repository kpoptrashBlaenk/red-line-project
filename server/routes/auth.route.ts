import { urls } from '$/constants/apiUrl'
import { Router } from 'express'
import AuthController from '../controller/auth.controller'
import { authMiddleware } from '../middleware/auth'

const router = Router()
const controller = new AuthController()

router.post(urls.auth_register, controller.register)
router.post(urls.auth_login, controller.login)
router.post(urls.auth_restore, controller.restore)
router.post(urls.auth_verify_password, authMiddleware, controller.verifyPassword)
router.post(urls.auth_forgot_password, controller.forgotPassword)
router.post(urls.auth_reset_password, controller.resetPassword)
router.delete(urls.auth_delete, authMiddleware, controller.deleteUser)

export default router
