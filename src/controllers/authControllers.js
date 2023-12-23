import { cookieOptions, roleDef, tokenDef } from '../config/constants.js'
import { SuccessResponse } from '../models/responseModel.js'
import { createPerson, loginPerson } from '../services/authServices.js'

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
    let token = await loginPerson(req.body, roleDef.user)
    let response = new SuccessResponse('login successful')
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
      `succcessfully created user ${user.fullName}`
    )
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
