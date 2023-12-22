import { ErrorResponse } from '../models/responseModel.js'

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let errResponse = new ErrorResponse(err.message)
  console.log(err)
  res.status(err.status || 500).send(errResponse)
}
