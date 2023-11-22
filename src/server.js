import express from 'express'
import logger from 'morgan'
import v1routes from './routes/v1/v1.js'

const app = express()

//regular middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//logger morgan
app.use(logger("dev"))

//routes
app.use('/',v1routes)

export { app }
