import mongoose from 'mongoose'

const { Schema } = mongoose
const commentSchama = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const postSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
      },
    ],
    comments: [commentSchama],
  },
  { timestamps: true }
)
const Post = mongoose.model('Post', postSchema)
export default Post
