import express from 'express'
import {
  adminLogin,
  adminLogout,
  adminPanel,
  blockUser,
  deletePosts,
} from '../../controllers/adminControllers.js'
import { verifyToken } from '../../middlewares/verifyToken.js'

const router = express.Router()

router.route('/').get(verifyToken, adminPanel)
router.route('/posts/delete/:postId').delete(verifyToken, deletePosts)
router.route('/block/user').put(blockUser)
router.route('/login').post(adminLogin)
router.route('/logout').post(adminLogout)

export default router
