import mongoose from 'mongoose'
import Post from '../models/postModel.js'
import User from '../models/userModel.js'
export const user = (req, res) => {
  console.log(req.userId)
  res.json('logged a valid user')
}
export const createPost = async (req, res) => {
  console.log(req.body)
  try {
    let newPost = await Post.create({
      user: new mongoose.Types.ObjectId(req.userId),
      content: req.body.content,
    })
    console.log(newPost)
    res.status(201).json(newPost)
  } catch (e) {
    res.status(400).send(e.message)
  }
}
export const getUserProfile = async (req, res) => {
  try {
    if (req.params?.username) {
      let userId = await User.exists({ username: req.params.username })
      if (userId) {
        let userPosts = await Post.find({ user: userId })
          .populate({
            path: 'user',
            select: '-password',
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
