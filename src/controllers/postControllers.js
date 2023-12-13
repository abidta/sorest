import mongoose, { isValidObjectId } from 'mongoose'
import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import createError from 'http-errors'
import { checkObjectId } from '../helpers/helper.js' //checking param objectId is valid or not

export const createPost = async (req, res, next) => {
  try {
    let newPost = await Post.create({
      user: new mongoose.Types.ObjectId(req.userId),
      content: req.body.content,
    })
    let isUpdatedUserPosts = await User.updateOne(
      { _id: newPost.user },
      { $push: { posts: newPost._id } }
    )
    console.log(newPost)
    res.status(201).json(newPost)
  } catch (e) {
    next(createError(400, e))
  }
}
export const getPost = async (req, res, next) => {
  const { postId } = req.params
  try {
    checkObjectId(postId)
    let post = await Post.findById(postId).populate(
      'user',
      'username fullName email'
    )
    if (!post) throw createError(404, 'post not found')
    res.status(200).json(post)
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
    res.status(200).send('done')
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
    res.status(200).json(post)
  } catch (e) {
    next(e)
  }
}
export const deleteComment = async (req, res, next) => {
  const { postId, commentId } = req.params
  console.log(req.params)
  try {
    checkObjectId([postId, commentId])
    console.log(typeof postId);
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
    res.json('comment deleted')
  } catch (e) {
    next(e)
  }
}
