import User from '../models/userModel.js'
import { generateToken } from '../utils/generateToken.js'

export const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    //check user exists
    let user = await User.exists({ email: email })
    if (!user) {
      //no user with this email, throw error
      throw new Error('user not found, check email')
    }
    //email validation success, get user details for password checking
    let [userData] = await User.find(user._id)
    //check password is correct
    let isCorrect = await userData.matchPassword(password)
    if (!isCorrect) {
      //password is not correct throw new error
      throw new Error('password dosent match, check password')
    }
    //all checking passed , do after login
    let token = generateToken(user._id)
    console.log(token, 'uo')
    let TTL_COOKIE = 3600 * 1000
    return res
      .cookie('access_token', token, { httpOnly: true, maxAge: TTL_COOKIE })
      .send('login successful')
  } catch (e) {
    return res.status(401).send(e.message)
  }
}
export const signup = async (req, res, next) => {
  try {
    console.log(req.body)
    const { name, email, password } = req.body
    //check user exist
    let userExist = await User.exists({ email: email })
    console.log(userExist, 'lok')
    if (userExist) {
      //if a email alredy registered, throw new error
      throw new Error('user already exist')
    }
    // new user, create new doc
    let user = await User.create({
      name,
      email,
      password,
      date: Date.now(),
    })
    return res.status(201).json(`succcessfully created user ${user.name}`)
  } catch (e) {
    res.status(400).send(e.message)
  }
}
export const logout = (req, res) => {
  return res
    .clearCookie('access_token')
    .status(202)
    .json({ message: 'Logout sucessfully' })
}
