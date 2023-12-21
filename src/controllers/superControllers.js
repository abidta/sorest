import mongoose from 'mongoose'
import { Admin } from '../models/userModel.js'
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/generateToken.js'

export const superPanel = (req, res, next) => {
  console.log('super api');
  res.send('super api')
}
export const superLogin = async (req, res, next) => {
  let { username, password } = req.body
  console.log(req.body)
  try {
    const superCollection = mongoose.connection.db.collection('super')
    let superAdmin = await superCollection.findOne({ username: username })
    console.log(superAdmin)
    if (!superAdmin) throw createError(400, 'incorrect credentials')
    let isMatch = await bcrypt.compare(password, superAdmin.password)
    if (!isMatch) throw createError(400, 'incorrect credentials')
    let token = generateToken(superAdmin._id,'super')
    res
      .cookie('super_token', token, { maxAge: 800000, httpOnly: true })
      .send({ message: 'super login suuceesful' })
  } catch (e) {
    next(e)
  }
}
export const createAdmin = async (req, res, next) => {
  console.log(req.body)
  const { username, fullName, email, password } = req.body
  try {
    let newAdmin = await Admin.create({
      username,
      fullName,
      email,
      password,
      role: 'admin',
    })
    res.json(newAdmin)
  } catch (e) {
    next(e)
  }
}
export const superlogout = (req, res) => {
  return res
    .clearCookie('super_token')
    .status(202)
    .json({ message: 'Logout sucessfully' })
}