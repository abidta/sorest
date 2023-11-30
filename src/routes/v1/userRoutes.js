import expres from 'express'
import { createPost } from '../../controllers/userControllers.js'
import { getPosts } from '../../controllers/feedControllers.js'

const router = expres.Router()

router.route('/').get(getPosts)
router.route('/post').post(createPost)

export default router