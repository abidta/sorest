import mongoose from 'mongoose'
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/generateToken.js'
import { createPerson } from '../services/authServices.js'
import { cookieOptions, role, tokenDef } from '../config/constants.js'
import { SuccessResponse } from '../models/responseModel.js'

export const superPanel = (req, res, next) => {
  console.log('super api')
  res.send('super api')
}
export const superLogin = async (req, res, next) => {
  let { username, password } = req.body
  console.log(req.body)
  try {
    const superCollection = mongoose.connection.db.collection('super')
    let superAdmin = await superCollection.findOne({ username: username })
    if (!superAdmin) throw createError(400, 'incorrect credentials')
    let isMatch = await bcrypt.compare(password, superAdmin.password)
    if (!isMatch) throw createError(400, 'incorrect credentials')
    let token = generateToken(superAdmin._id, role.super)
    let response = new SuccessResponse('super login suuceesful')
    res.cookie(tokenDef.super, token, cookieOptions).send(response)
  } catch (e) {
    next(e)
  }
}
export const createAdmin = async (req, res, next) => {
  console.log(req.body)
  try {
    let newAdmin = await createPerson(req.body, 'admin')
    let response = new SuccessResponse(undefined, newAdmin)
    res.json(response)
  } catch (e) {
    next(e)
  }
}
export const superlogout = (req, res) => {
  let response = new SuccessResponse('Logout sucessfully')
  return res.clearCookie(tokenDef.super).status(202).json(response)
}
