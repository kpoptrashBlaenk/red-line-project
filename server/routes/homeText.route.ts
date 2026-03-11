import HomeTextController from '#/controller/homeText.controller'
import { urls } from '$/constants/apiUrl'
import { Router } from 'express'

const router = Router()
const controller = new HomeTextController()

router.get(urls.home_text_get_all, controller.getAll)
router.put(urls.home_text_update, controller.update)

export default router
