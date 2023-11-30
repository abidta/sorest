import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  try {
    console.log(req.headers)
    console.log(req.headers.cookie.split('=')[1])
    let verified = jwt.verify(
      req.headers.cookie.split('=')[1],
      process.env.JWT_SECRET
    )
    if (verified) {
      req.userId = verified.userId
      next()
    }
  } catch (e) {
    res.status(401).send(e.message)
  }
}
