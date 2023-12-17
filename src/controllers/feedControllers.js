import Post from '../models/postModel.js'
export const getPosts = async (req, res) => {
  try {
    let posts = await Post.find({}).lean().populate({
      path: 'user',
      select: 'username',
    })
    return res.json(posts)
  } catch (e) {
    console.log('get post')
    return res.status(401).send(e.message)
  }
}
