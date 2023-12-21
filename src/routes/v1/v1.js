import express from 'express'
import authRoutes from './authRoutes.js'
import userRoutes from './userRoutes.js'
import adminRoutes from './adminRoutes.js'
import superAdmin from './superAdmin.js'
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
    '/admin',
    adminRoutes
    /* #swagger.tags = ['Admin routes']
       #swagger.responses[500] */
  )
  .use(
    '/super',
    superAdmin
    /* #swagger.tags = ['Super routes']
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
