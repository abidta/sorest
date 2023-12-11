import createError from 'http-errors'
import { isValidObjectId } from 'mongoose'

export const checkObjectId = (id) => {
  if (!isValidObjectId(id)) {
    throw createError(400, `'${id}' is invalid ObjectId`)
  }
  return true
}
