import createError from 'http-errors'
import { roleDef } from '../config/constants.js'
import Post from '../models/postModel.js'

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
