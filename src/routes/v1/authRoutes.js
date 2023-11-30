import expres from 'express'
import { login,logout,signup } from '../../controllers/authControllers.js'
import { verifyToken } from '../../middlewares/verifyToken.js'

const router = expres.Router()

router.route('/login').post(login)
router.route('/signup').post(signup)
router.route('/logout').post(verifyToken,logout)

export default router