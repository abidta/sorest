import Post from '../models/postModel.js'
import createError from 'http-errors'
import { checkObjectId } from '../utils/helper.js' //checking param objectId is valid or not
import { uploadToCdn } from '../utils/uploadToCdn.js'
import { SuccessResponse } from '../models/responseModel.js'
import { deletePost, postService } from '../services/postServices.js'
import { roleDef } from '../config/constants.js'
import { uploadQueue } from '../config/queue.js'

/**
 *
 * @param {*} req The express request object
 * @param {*} res The express response object
 * @param {*} next The next middleware function in the Express pipeline
 */
export const createPost = async (req, res, next) => {
  const files = req.files
  let uploadResult
  try {
    if (!files) {
      const post = postService(req.userId, req.body.content)
      return res.status(201).json(new SuccessResponse(undefined, post))
    }
    /**
     * if files, file uploading in background process with bull and redis.
     */

    uploadQueue.add({ file: files })
    res.json('upload process started')
    uploadQueue.process(async (job) => {
      console.log('queue')
      const { file } = job.data
      uploadResult = await uploadToCdn(file, req.userId)
      return postService(req.userId, req.body.content, uploadResult)
    })
  } catch (e) {
    next(createError(400, e))
  }
}

//delete post with postId
export const deletePosts = async (req, res, next) => {
  const { postId } = req.params
  try {
    checkObjectId(postId)
    await deletePost(postId, roleDef.user, req.userId)
    res.json(new SuccessResponse('Delete successFully'))
  } catch (e) {
    next(e)
  }
}

//get post with postId
export const getPost = async (req, res, next) => {
  const { postId } = req.params
  try {
    checkObjectId(postId)
    let post = await Post.findById(postId)
      .lean()
      .populate('user', 'username fullName email ')

    if (!post) throw createError(404, 'post not found')

    if (post.likes.some((id) => id.equals(req.userId))) {
      post.liked = true
    }
    let response = new SuccessResponse(undefined, post)
    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
}

export const likePost = async (req, res, next) => {
  const { postId } = req.params
  // 'req.query' may have multiple queries. currently only take first query.
  let { action } = req.query
  action = Array.isArray(action) ? action[0] : action
  console.log(req.query)
  console.log(action)
  try {
    checkObjectId(postId)
    let post = await Post.findById(postId)
    console.log(post)
    if (!post) throw createError(404, 'post not found')
    switch (action) {
      case 'like':
        if (post.likes.indexOf(req.userId) == -1) {
          post.likes.push(req.userId)
          await post.save()
        }
        break
      case 'unlike':
        if (post.likes.indexOf(req.userId) !== -1) {
          post.likes.pull(req.userId)
          await post.save()
        }
        break
      default:
        throw createError(400, 'query is not valid')
    }
    let response = new SuccessResponse(`${action} successful`)
    res.status(200).send(response)
  } catch (e) {
    next(e)
  }
}

export const createComment = async (req, res, next) => {
  const { comment } = req.body
  const { postId } = req.params
  try {
    checkObjectId(postId)
    let post = await Post.findById(postId)
    if (!post) throw createError(404, 'post not found')
    post.comments.push({ user: req.userId, text: comment })
    await post.save()
    let response = new SuccessResponse(undefined, post)
    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
}

export const deleteComment = async (req, res, next) => {
  const { postId, commentId } = req.params
  console.log(req.params)
  try {
    checkObjectId([postId, commentId])

    let post = await Post.findById(postId)
    if (!post) throw createError(404, 'post not found')
    if (!post.comments.id(commentId)) {
      throw createError(404, 'comment not found')
    }
    console.log(post.comments.id(commentId))

    if (
      post.user != req.userId &&
      post.comments.id(commentId).user != req.userId
    ) {
      throw createError(401, 'no permission to delete this comment')
    }

    post.comments.pull(commentId)
    await post.save()

    res.json(new SuccessResponse('comment deleted'))
  } catch (e) {
    next(e)
  }
}
