import expres from 'express'
import { user,createPost } from '../../controllers/userControllers.js'

const router = expres.Router()

router.route('/').get(user)
router.route('/post').post(createPost)

export default router