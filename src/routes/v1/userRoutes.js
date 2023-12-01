import expres from 'express'
import { createPost , getUserProfile } from '../../controllers/userControllers.js'
import { getPosts } from '../../controllers/feedControllers.js'

const router = expres.Router()

router.route('/').get(getPosts)
router.route('/post').post(createPost)
router.route('/:username').get(getUserProfile)

export default router
