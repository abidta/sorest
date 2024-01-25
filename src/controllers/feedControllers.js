import createError from 'http-errors'
import Post from '../models/postModel.js'
import { SuccessResponse } from '../models/responseModel.js'
export const getPosts = async (req, res, next) => {
  try {
    let posts = await Post.find({}).lean().populate({
      path: 'user',
      select: 'username fullName image',
    })
    let response = new SuccessResponse(undefined, posts)
    return res.json(response)
  } catch (e) {
    next(createError(401, e.message))
  }
}
