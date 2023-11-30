import Post from '../models/postModel.js'
export const getPosts = async (req, res) => {
  try {
    let posts = await Post.find().populate({
      path: 'user',
      select: 'name -_id',
    })
    res.json(posts)
  } catch (e) {
    console.log('get post')
    res.status(401).send(e.message)
  }
}
