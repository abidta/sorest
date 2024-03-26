import { cookieOptions, roleDef, tokenDef } from '../config/constants.js'
import { SuccessResponse } from '../models/responseModel.js'
import { User } from '../models/userModel.js'
import { loginPerson } from '../services/authServices.js'
import { deletePost } from '../services/postServices.js'
import { checkObjectId } from '../utils/helper.js'

export const adminPanel = async (req, res, next) => {
  try {
    let allUsers = await User.find().select('-password').limit(20).lean()
    res.json(new SuccessResponse(undefined, allUsers))
  } catch (e) {
    next(e)
  }
}
export const deletePosts = async (req, res, next) => {
  const { postId } = req.params
  try {
    checkObjectId(postId)
    await deletePost(postId, roleDef.admin)
    res.json(new SuccessResponse('Delete successFully'))
  } catch (e) {
    next(e)
  }
}

export const adminLogin = async (req, res, next) => {
  try {
    let token = await loginPerson(req.body, roleDef.admin)
    let response = new SuccessResponse('login successful')
    return res.cookie(tokenDef.admin, token, cookieOptions).send(response)
  } catch (e) {
    next(e)
  }
}
export const adminLogout = (req, res) => {
  let response = new SuccessResponse('Logout sucessfully')
  return res.clearCookie(tokenDef.admin).status(202).json(response)
}
