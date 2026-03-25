import { Router } from 'express'
import AuthController from '../controller/auth.controller'

const router = Router()
const controller = new AuthController()

router.post('/auth/register', controller.create);

router.delete('/auth/delete', controller.delete);

router.get('/auth/login', controller.login);

router.put('/auth/logout', controller.logOut);

router.get('/auth/me', controller.me);

router.put('/auth/reset', controller.reset);

export default router