import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  try {
    if (req.headers?.cookie) {
       let verified = jwt.verify(
      req.headers?.cookie?.split('=')[1],
      process.env.JWT_SECRET
    )
    if (verified) {
      req.userId = verified.userId
      next()
    }
    }
    else{
      res.status(403).send('login first')
    }
   
  } catch (e) {
    res.status(401).send(e.message)
  }
}
