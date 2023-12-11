import mongoose, { isValidObjectId } from 'mongoose'
import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import createError from 'http-errors'

export const user = (req, res) => {
  console.log(req.userId)
  res.json('logged a valid user')
}
export const getUserProfile = async (req, res, next) => {
  try {
    if (req.params?.username) {
      let userId = await User.exists({ username: req.params.username })
      if (userId) {
        let userPosts = await User.find({ _id: userId }, '-password')
          .populate({
            path: 'posts',
            select: '-user',
          })
          .exec()
        return res.json(userPosts)
      }
      throw createError(404, 'no user found')
    }
  } catch (e) {
    next(e)
  }
}
export const updateUserDeatails = async (req, res, next) => {
  const { name } = req.body
  try {
    let isUpdated = await User.updateOne(
      { _id: req.userId },
      { fullName: name }
    )
    console.log(isUpdated)
    res.json(isUpdated.acknowledged)
  } catch (e) {
    next(createError(400, e))
  }
}
export const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body
  console.log(req.body)
  console.log(oldPassword, 'old')
  try {
    const [user] = await User.find({ _id: req.userId })
    console.log(user)
    let isValid = await user.matchPassword(oldPassword)
    console.log(isValid)
    if (!isValid) {
      throw createError(401, 'Password is incorrect')
    }
    user.password = newPassword
    await user.save()
    res.status(200).json('update successfully')
  } catch (e) {
    next(e)
  }
}
