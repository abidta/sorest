import expres from 'express'
import {
  getUserProfile,
  updatePassword,
  updateProfilePicture,
  updateUserDeatails,
} from '../../controllers/userControllers.js'
import { getPosts } from '../../controllers/feedControllers.js'
import {
  createComment,
  createPost,
  deleteComment,
  deletePosts,
  getPost,
  likePost,
} from '../../controllers/postControllers.js'
import { upload } from '../../middlewares/fileUpload.js'
const router = expres.Router()
const maxFileCount = 5

router.route('/').get(getPosts)
router.route('/post').post(upload.array('posts', maxFileCount), createPost)
router.route('/posts/:postId').get(getPost)
router.route('/posts/:postId').put(likePost)
router.route('/posts/:postId').delete(deletePosts)
router.route('/posts/:postId/comment').post(createComment)
router.route('/posts/:postId/comments/:commentId').delete(deleteComment)
router.route('/account/update').put(updateUserDeatails)
router
  .route('/account/image')
  .put(upload.single('profile'), updateProfilePicture)
router.route('/account/update/password').put(updatePassword)
router.route('/:username').get(getUserProfile)

export default router
