import expres from 'express'
import { login,logout,sendMail,signup } from '../../controllers/authControllers.js'
import { verifyToken } from '../../middlewares/verifyToken.js'

const router = expres.Router()

router.route('/login').post(login)
router.route('/signup').post(signup)
router.route('/send-mail').post(sendMail)
router.route('/logout').post(verifyToken,logout)

export default router