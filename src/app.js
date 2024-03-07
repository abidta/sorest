import 'dotenv/config'
import express from 'express'
import logger from 'morgan'
import v1routes from './routes/v1/v1.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { createRequire } from 'module'
import swaggerUi from 'swagger-ui-express'
// import swaggerDocument from '../swagger-output.json' assert { type: 'json' }
import { errorHandler } from './middlewares/errorHandler.js'
import createHttpError from 'http-errors'
import { SuccessResponse } from './models/responseModel.js'
import { limiter } from './config/config.js'

const require = createRequire(import.meta.url)
const swaggerDocument = require('../swagger-output.json')

const app = express()

const allowedOrigins = /^.*$/ //allow all origins

//cors middleware
app.use(
  cors({
    origin: function (origin, cb) {
      if (!origin || allowedOrigins.test(origin)) {
        cb(null, true)
      } else {
        cb(new Error('origin not supported'))
      }
    },
    credentials: true,
  })
)

//ratelimiter
app.use(limiter)

//regular middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//logger morgan
app.use(logger('dev'))

//routes
app.get('/api/test', (req, res) => {
  res.json(new SuccessResponse('test', { test: 'done' }))
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/v1', v1routes)

//catch 404
app.use((req, res, next) => {
  next(createHttpError(404))
})
//error handler
app.use(errorHandler)

export default app
