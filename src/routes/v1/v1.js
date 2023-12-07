import express from 'express'
import authRoutes from './authRoutes.js'
import userRoutes from './userRoutes.js'
import { verifyToken } from '../../middlewares/verifyToken.js'

const router = express.Router()
router.use('/auth', authRoutes).use('/', verifyToken, userRoutes)
export default router
