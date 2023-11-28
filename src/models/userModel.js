import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema } = mongoose
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    required: [true, 'mail is required '],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  date: String,
})
userSchema.pre('save', async function (next) {
  try {
    let salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    console.log('hook')
    return next()
  } catch (e) {
    next(e)
  }
})
const User = new mongoose.model('User', userSchema)
export default User
