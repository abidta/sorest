import createError from 'http-errors'
import { roleDef } from '../config/constants.js'
import Post from '../models/postModel.js'
import mongoose from 'mongoose'
import { User } from '../models/userModel.js'

export const deletePost = async (postId, role, userId) => {
  let post = await Post.findById(postId)
  if (!post) {
    throw createError(404, 'Post not found')
  }
  if (role === roleDef.user && post.user != userId) {
    throw createError(403, 'No permission to delete this post')
  }
  await post.deleteOne({ _id: postId })
  return true
}

export const postService = async (userId,content,uploadResult) => {
  let newPost = await Post.create({
    user: new mongoose.Types.ObjectId(userId),
    content: content,
    media: uploadResult ?? [],
  })

  await User.updateOne({ _id: newPost.user }, { $push: { posts: newPost._id } })

  const post = await Post.populate(newPost, {
    path: 'user',
    select: 'username fullName',
  })
  console.log(post)
  return post
}
