import createError from 'http-errors'
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  try {
    if (req.cookies?.access_token || req.headers?.access_token) {
      let verified = jwt.verify(
        req.cookies.access_token || req.headers.access_token,
        process.env.JWT_SECRET
      )
      if (verified) {
        req.userId = verified.userId
        next()
      }
    } else {
      throw createError(403, 'login first')
    }
  } catch (e) {
    next(createError(401, e.message))
  }
}
