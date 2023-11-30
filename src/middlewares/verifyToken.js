import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  try {
    if (req.cookies?.access_token) {
      let verified = jwt.verify(
        req.cookies?.access_token,
        process.env.JWT_SECRET
      )
      if (verified) {
        req.userId = verified.userId
        next()
      }
    } else {
      res.status(403).send('login first')
    }
  } catch (e) {
    res.status(401).send(e.message)
  }
}
