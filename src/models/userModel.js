import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema } = mongoose

const userAddOnSchema = new Schema({
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: String,
    enum: ['pending', 'success'],
    default: 'pending',
  },
})

const commonSchema = {
  username: {
    type: String,
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
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  image: Object,
}

const userSchema = new Schema(
  {
    ...commonSchema,
  },
  { timestamps: true }
)

const adminSchema = new Schema(
  {
    ...commonSchema,
  },
  { timestamps: true }
)

async function hashPassword(next) {
  try {
    let salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (e) {
    next(e)
  }
}
async function compare(clientPassword) {
  return await bcrypt.compare(clientPassword, this.password)
}

userSchema.pre('save', hashPassword)
userSchema.method('matchPassword', compare)

adminSchema.pre('save', hashPassword)
adminSchema.method('matchPassword', compare)

const Admin = mongoose.model('Admin', adminSchema)
const User = mongoose.model('User', userSchema.add(userAddOnSchema))

export { User, Admin }
