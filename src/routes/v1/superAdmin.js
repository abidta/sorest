import express from 'express'
import {
  createAdmin,
  superLogin,
  superPanel,
  superlogout,
} from '../../controllers/superControllers.js'
import { verifyToken } from '../../middlewares/verifyToken.js'

const router = express.Router()
router.route('/').get(verifyToken, superPanel)
router.route('/login').post(superLogin)
router.route('/logout').post(superlogout)
router.route('/create/admin').post(verifyToken,createAdmin)
router.route('/delete/:adminId').delete(verifyToken)

export default router
