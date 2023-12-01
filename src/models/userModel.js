import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema } = mongoose
const userSchema = new Schema(
  {
    userName:{
      type:String,
      required: [true, 'user name is required'],
      minLength: [3, 'minimum 3 character for user names you entered :{VALUE}'],
      maxLength: [30, 'maximum 30 character for user names'],
    },
    fullName: {
      type: String,
      required: [true, 'name is required'],
      minLength: [3, 'minimum 3 character for names {VALUE}'],
      maxLength: [30, 'maximum 30 character for names'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'mail is required '],
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        'Enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'password must include a lowercase, uppercase, number and special character',
      ],
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  { timestamps: true }
)
// userSchema.pre('validate',function (next,options) {

// })
userSchema.pre('save', async function (next, options) {
  console.log({ ...options }, 'optt')
  try {
    let salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    console.log('hook')
    return next()
  } catch (e) {
    next(e)
  }
})
userSchema.method('matchPassword', async function (clientPassword) {
  return await bcrypt.compare(clientPassword, this.password)
})
const User = new mongoose.model('User', userSchema)
export default User
