import { cookieOptions, role, tokenDef } from '../config/constants.js'
import { SuccessResponse } from '../models/responseModel.js'
import { loginPerson } from '../services/authServices.js'

export const adminPanel = (req, res, next) => {
  res.send('admin api')
}
export const adminLogin = async (req, res, next) => {
  try {
    let token = await loginPerson(req.body, role.admin)
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
