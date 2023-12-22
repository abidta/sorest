import 'dotenv/config'
import express from 'express'
import logger from 'morgan'
import v1routes from './routes/v1/v1.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger-output.json' assert { type: 'json' }
import { errorHandler } from './middlewares/errorHandler.js'
import createHttpError from 'http-errors'


const app = express()

app.use(cors({ origin: '*' }))
//regular middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//logger morgan
app.use(logger('dev'))

//routes
app.get('/api/kl/kl',(req,res)=>{
    
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/', v1routes)

//catch 404
app.use((req,res,next)=>{
    next(createHttpError(404))
})
//error handler
app.use(errorHandler)

export default app 
