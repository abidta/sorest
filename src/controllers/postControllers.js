import mongoose from 'mongoose'
import Post from '../models/postModel.js'
import { User } from '../models/userModel.js'
import createError from 'http-errors'
import { checkObjectId } from '../utils/helper.js' //checking param objectId is valid or not
import { uploadToCdn } from '../utils/uploadToCdn.js'
import { SuccessResponse } from '../models/responseModel.js'
import { deletePost } from '../services/postServices.js'
import { roleDef } from '../config/constants.js'

/**
 *
 * @param {*} req The express request object
 * @param {*} res The express response object
 * @param {*} next The next middleware function in the Express pipeline
 */
export const createPost = async (req, res, next) => {
  const files = req.files
  let uploadResult
  console.log(files, 'files')
  try {
    if (files) {
      uploadResult = await uploadToCdn(files, req.userId)
      console.log(uploadResult, 'fd')
    }

    let newPost = await Post.create({
      user: new mongoose.Types.ObjectId(req.userId),
      content: req.body.content,
      media: uploadResult ?? [],
    })

    await User.updateOne(
      { _id: newPost.user },
      { $push: { posts: newPost._id } }
    )

    const post = await Post.populate(newPost, {
      path: 'user',
      select: 'username fullName',
    })
    console.log(post)

    res.status(201).json(new SuccessResponse(undefined, post))
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
