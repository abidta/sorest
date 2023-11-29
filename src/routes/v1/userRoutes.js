import expres from 'express'
import { user } from '../../controllers/userControllers.js'

const router = expres.Router()

router.route('/').get(user)

export default router