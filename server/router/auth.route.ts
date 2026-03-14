import { Router } from 'express'
import AuthController from '../controller/auth.controller'

const router = Router()
const controller = new AuthController()

router.post('/auth/register', controller.create);

router.put('/auth/login', controller.login);

router.put('/auth/logout/:token', controller.logOut)

router.put('/auth/me/:token', controller.me);

router.get('/auth/verify/:token', controller.verify);

export default router