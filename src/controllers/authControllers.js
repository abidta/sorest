import createError from 'http-errors'
import { cookieOptions, roleDef, tokenDef } from '../config/constants.js'
import { SuccessResponse } from '../models/responseModel.js'
import { createPerson, loginPerson } from '../services/authServices.js'
import OTP from '../services/OTPService.js'
import { User } from '../models/userModel.js'

export const login = async (req, res, next) => {
  /* #swagger.requestBody = {
        required: true,
        description: "Login user",
        content: {
          "application/json ": {
           schema: { $ref: '#/components/schemas/loginUser' },
         }
       } 
     } 
     #swagger.responses[401] */
  try {
    let { token, user } = await loginPerson(req.body, roleDef.user)
    let response = new SuccessResponse('login successful', user)
    return res.cookie(tokenDef.user, token, cookieOptions).send(response)
  } catch (e) {
    next(e)
  }
}
export const signup = async (req, res, next) => {
  /* #swagger.requestBody = {
      required: true,
      description: "Create a new user",
      content:{
        "application/json ":{
          schema: { $ref: '#/components/schemas/addUser'},
         }
       } 
     }  
     #swagger.responses[400] = { description: "user already exist or Bad request"} */
  try {
    console.log(req.body)
    let user = await createPerson(req.body, 'user')
    let response = new SuccessResponse(
      `succcessfully created user ${user.fullName}`,
      { email: user.email }
    )
    const email = req.body.email
    const mailInfo = await OTP.send(email)
    console.log(mailInfo)
    return res.status(201).json(response)
  } catch (e) {
    next(e)
  }
}
export const logout = (req, res) => {
  /* #swagger.description = "Logout user"
     #swagger.responses[202] */
  let response = new SuccessResponse('Logout sucessfully')
  return res.clearCookie(tokenDef.user).status(202).json(response)
}
export const sendMail = async (req, res, next) => {
  const { email } = req.body
  try {
    const mailInfo = await OTP.send(email)
    console.log(mailInfo)
    console.log('success')
    res.json(new SuccessResponse('otp send to your email'))
  } catch (e) {
    next(e)
  }
}
export const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body
  try {
    if (OTP.verify(email, otp)) {
      await User.updateOne({ email: email }, { isVerified: 'success' })
      return res.json(new SuccessResponse('email verified successfully'))
    }
    throw createError(401, 'Otp is incorrect')
  } catch (e) {
    next(e)
  }
}
