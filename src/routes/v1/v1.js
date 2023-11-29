import express from 'express'
import authRoutes from './authRoutes.js'
import userRoutes from './userRoutes.js'
import { verifyToken } from '../../middlewares/verifyToken.js'

const router = express
  .Router()
  .use('/auth', authRoutes)
  .use('/user',verifyToken, userRoutes)
export default router
