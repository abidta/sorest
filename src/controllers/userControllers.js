import mongoose from 'mongoose'
import Post from '../models/postModel.js'
export const user = (req, res) => {
  console.log(req.userId)
  res.json('logged a valid user')
}
export const createPost = async (req, res) => {
  console.log(req.body)
  try {
   let newPOst= await Post.create({
      user: new mongoose.Types.ObjectId(req.userId),
      content: req.body.content,
    })
    console.log(newPOst)
    res.status(201).json(newPOst)

  } catch (e) {
    res.status(400).send(e.message)
  }
}
