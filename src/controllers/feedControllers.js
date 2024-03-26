import createError from 'http-errors'
import Post from '../models/postModel.js'
import { SuccessResponse } from '../models/responseModel.js'

//get all posts for feed,
export const getPosts = async (req, res, next) => {
  const { page, limit } = req.query
  const count = limit ?? 0
  const skip = page > 0 ? (page - 1) * (limit !== 0 ? limit : 10) : 0

  try {
    let posts = await Post.find({})
      .sort({ createdAt: 'desc' })
      .skip(skip)
      .limit(count)
      .populate({
        path: 'user',
        select: 'username fullName image',
      })
      .lean()

    const postwithliked = posts.map((post) => ({
      ...post,
      liked: post.likes.some((id) => id.equals(req.userId)),
    }))
    console.log(posts.length)
    // console.log(postwithliked)
    let response = new SuccessResponse(undefined, postwithliked)
    return res.json(response)
  } catch (e) {
    next(createError(401, e.message))
  }
}
