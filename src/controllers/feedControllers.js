import Post from '../models/postModel.js'
export const getPosts = async (req, res) => {
  try {
    let posts = await Post.find()
    res.json(posts)
  } catch (e) {
    console.log('get post')
    res.status(401).send(e.message)
  }
}
