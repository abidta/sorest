import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import { roleDef, tokenDef } from '../config/constants.js'

export const verifyToken = (req, res, next) => {
  let tokenType = tokenDef[req.originalUrl.split('/')[1]] ?? tokenDef.user
  console.log(tokenType, req.originalUrl.split('/'), 'type')
  try {
    if (req.cookies?.[tokenType] || req.headers?.[tokenType]) {
      let verified = jwt.verify(
        req.cookies[tokenType] || req.headers[tokenType],
        process.env.JWT_SECRET
      )
      if (tokenDef[verified.role] !== tokenType) {
        throw createError(401, 'role not match with this token')
      }
      if (verified.role === roleDef.user) {
        req.userId = verified.id
        next()
      } else if (verified.role === roleDef.admin) {
        req.adminId = verified.id
        next()
      } else if (verified.role === roleDef.super) {
        next()
        req.superId = verified.id
      } else {
        throw createError(401, 'invailed role')
      }
    } else {
      throw createError(403, 'login first')
    }
  } catch (e) {
    next(createError(401, e.message))
  }
}
