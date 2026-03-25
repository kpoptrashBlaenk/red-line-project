import { urls } from '$/constants/apiUrl'
import { Router } from 'express'
import CharacteristicController from '../controller/characteristic.controller'

const router = Router()
const controller = new CharacteristicController()

router.get(urls.characteristic_get_all, controller.getAll)
router.post(urls.characteristic_get_by_ids, controller.getByIds)
router.get(urls.characteristic_get_by_type, controller.getByType)
router.post(urls.characteristic_create, controller.create)
router.put(urls.characteristic_update, controller.update)
router.delete(urls.characteristic_delete, controller.delete)

export default router
