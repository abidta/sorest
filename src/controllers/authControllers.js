import { role, tokenDef } from '../config/constants.js'
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
    let token = await loginPerson(req.body, role.user)
    let TTL_COOKIE = 3600 * 1000
    return res
      .cookie(tokenDef.user, token, { httpOnly: true, maxAge: TTL_COOKIE })
      .send('login successful')
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
    return res.status(201).json(`succcessfully created user ${user.fullName}`)
  } catch (e) {
    next(e)
  }
}
export const logout = (req, res) => {
  /* #swagger.description = "Logout user"
     #swagger.responses[202] */
  return res
    .clearCookie(tokenDef.user)
    .status(202)
    .json({ message: 'Logout sucessfully' })
}
