import mongoose, { isValidObjectId } from 'mongoose'
import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import createError from 'http-errors'

export const user = (req, res) => {
  console.log(req.userId)
  res.json('logged a valid user')
}
export const createPost = async (req, res) => {
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
    res.status(400).send(e.message)
  }
}
export const getPost = async (req, res, next) => {
  const { id: postId } = req.params
  try {
    if (!isValidObjectId(postId)) {
      throw new createError(400, 'id not valid')
    }
    let post = await Post.findById(postId).populate(
      'user',
      'username fullName email'
    )
    if (!post) {
      throw createError(404, 'post not found')
    }
    res.status(200).json(post)
  } catch (e) {
    next(e)
    //res.status(404).send(e.message)
  }
}
export const getUserProfile = async (req, res) => {
  try {
    if (req.params?.username) {
      let userId = await User.exists({ username: req.params.username })
      if (userId) {
        let userPosts = await User.find({ _id: userId }, '-password')
          .populate({
            path: 'posts',
            select: '-user',
          })
          .exec()
        return res.json(userPosts)
      }
      return res.status(404).json({ message: 'no user found' })
    }
  } catch (e) {
    res.status(500).send(e.message)
  }
}
export const updateUserDeatails = async (req, res) => {
  const { name } = req.body
  let isUpdated = await User.updateOne({ _id: req.userId }, { fullName: name })
  console.log(isUpdated)
  res.json(isUpdated.acknowledged)
}
export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  console.log(req.body)
  console.log(oldPassword, 'old')
  try {
    const [user] = await User.find({ _id: req.userId })
    console.log(user)
    let isValid = await user.matchPassword(oldPassword)
    console.log(isValid)
    if (!isValid) {
      throw new Error('password doesnt match ')
    }
    user.password = newPassword
    await user.save()
    res.status(200).json('update successfully')
  } catch (e) {
    res.status(400).json(e.message)
  }
}
export const likePost = async (req, res) => {
  const postId = req.params.id
  // 'req.query' may have multiple queries. currently only take first query.
  let { action } = req.query
  action = Array.isArray(action) ? action[0] : action
  console.log(req.query)
  console.log(action)
  try {
    if (!isValidObjectId(postId)) {
      throw new Error(`'${postId}' is not valid objectId`)
    }
    let post = await Post.findById({ _id: postId })
    console.log(post, 'post')
    if (!post) {
      throw new Error('post not found')
    }
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
        return res.status(400).send('query is not valid')
    }
    res.status(200).send('done')
  } catch (e) {
    res.status(404).send(e.message)
  }

  console.log('hmm')
}
export const createComment = async (req, res, next) => {
  const { comment } = req.body
  const {id: postId } = req.params
  try {
    if (!isValidObjectId(postId)) {
      throw createError(400,"objectId not valid ")
    }
    let post = await Post.findById(postId)
    if (!post) throw createError(404,'not found')
    post.comments.push({user:req.userId,text:comment})
    await post.save()
    res.status(200).json(post)
  } catch (e) {
    next(e)
  }
}
