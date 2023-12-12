import createError from 'http-errors'
import { isValidObjectId } from 'mongoose'

function err(id) {
  return createError(400, `'${id}' is invalid ObjectId`)
}
//multiple arguments, you must pass in a array
export const checkObjectId = (id) => {
  if (Array.isArray(id)) {
    id.forEach((objectId) => {
      if (!isValidObjectId(objectId)) {
        throw err(objectId)
      }
    })
    return true
  }
  if (!isValidObjectId(id)) {
    throw err(id)
  }
  return true
}
