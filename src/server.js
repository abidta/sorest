import express from 'express'
import logger from 'morgan'
import v1routes from './routes/v1/v1.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({ origin: true }))
//regular middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//logger morgan
app.use(logger('dev'))

//routes
app.use('/', v1routes)

export { app }
