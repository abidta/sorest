import mongoose from 'mongoose'
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/generateToken.js'
import { createPerson } from '../services/authServices.js'
import { cookieOptions, roleDef, tokenDef } from '../config/constants.js'
import { SuccessResponse } from '../models/responseModel.js'
import { Admin } from '../models/userModel.js'
import { checkObjectId } from '../utils/helper.js'

export const superPanel = async (req, res, next) => {
  try {
    let allAdmins = await Admin.find().select('-password').lean()
    res.send(new SuccessResponse(undefined, allAdmins))
  } catch (e) {
    next(e)
  }
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

    let token = generateToken(superAdmin._id, roleDef.super)
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
export const deleteAdmin = async (req, res, next) => {
  const { adminId } = req.params
  try {
    checkObjectId(adminId)
    let isDeleted = await Admin.deleteOne({ _id: adminId })
    if (!isDeleted) {
      throw createError(404, 'Not found admin')
    }
    res.json(new SuccessResponse('Admin deletation successfully'))
  } catch (e) {
    next(e)
  }
}
export const superlogout = (req, res) => {
  let response = new SuccessResponse('Logout sucessfully')
  return res.clearCookie(tokenDef.super).status(202).json(response)
}
