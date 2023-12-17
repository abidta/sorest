import express from 'express'
import authRoutes from './authRoutes.js'
import userRoutes from './userRoutes.js'
import { verifyToken } from '../../middlewares/verifyToken.js'

const router = express.Router()
router
  .use(
    '/auth',
    authRoutes
    /* #swagger.tags = ['Auth routes']
       #swagger.responses[500] */
  )
  .use(
    '/',
    verifyToken,
    userRoutes
    /* #swagger.tags = ['User routes']
       #swagger.responses[500] */
  )
export default router
