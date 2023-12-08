import expres from 'express'
import { createPost , getUserProfile, updatePassword, updateUserDeatails, likePost } from '../../controllers/userControllers.js'
import { getPosts } from '../../controllers/feedControllers.js'

const router = expres.Router()

router.route('/').get(getPosts)
router.route('/post').post(createPost)
router.route('/post/:id').put(likePost)
router.route('/account/update').put(updateUserDeatails)
router.route('/account/update/password').put(updatePassword)
router.route('/:username').get(getUserProfile)

export default router
