import expres from 'express'
import {
  getUserProfile,
  updatePassword,
  updateUserDeatails,
} from '../../controllers/userControllers.js'
import { getPosts } from '../../controllers/feedControllers.js'
import {
  createComment,
  createPost,
  getPost,
  likePost,
} from '../../controllers/postControllers.js'

const router = expres.Router()

router.route('/').get(getPosts)
router.route('/post').post(createPost)
router.route('/post/:id').get(getPost)
router.route('/post/:id').put(likePost)
router.route('/post/comment/:id').post(createComment)
router.route('/account/update').put(updateUserDeatails)
router.route('/account/update/password').put(updatePassword)
router.route('/:username').get(getUserProfile)

export default router
