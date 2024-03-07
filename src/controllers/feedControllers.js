import createError from 'http-errors'
import Post from '../models/postModel.js'
import { SuccessResponse } from '../models/responseModel.js'

export const getPosts = async (req, res, next) => {
  try {
    let posts = await Post.find({})
      .sort({ createdAt: 'desc' })
      .populate({
        path: 'user',
        select: 'username fullName image',
      })
      .lean()

    const postwithliked = posts.map((post) => ({
      ...post,
      liked: post.likes.some((id) => id.equals(req.userId)),
    }))
    console.log(postwithliked)
    let response = new SuccessResponse(undefined, postwithliked)
    return res.json(response)
  } catch (e) {
    next(createError(401, e.message))
  }
}
