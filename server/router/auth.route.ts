import { Router } from 'express'
import AuthController from '../controller/auth.controller'

const router = Router()
const controller = new AuthController()

router.post('/auth/register', controller.create);

router.delete('/auth/delete/:token', controller.delete);

router.put('/auth/login', controller.login);

router.put('/auth/logout', controller.logOut)

router.put('/auth/me/:token', controller.me);

//router.get('/auth/verify/:token', controller.verify);

export default router