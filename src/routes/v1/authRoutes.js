import expres from 'express'
import { login } from '../../controllers/authControllers.js'

const router = expres.Router()

router.route('/login').post(login)

export default router