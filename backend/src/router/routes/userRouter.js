import {
  createUser,
  getUserById,
  loginUser,
  logoutUser,
  checkAuth,
  getUserData,
} from '../../controllers/userController.js'

import express from 'express'
import { verifyJWT } from '../../middleware/auth.middleware.js'

const userRouter = express.Router()

userRouter.post('/create', createUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', verifyJWT, logoutUser)
userRouter.post('/checkAuth', checkAuth)
userRouter.get('/refreshUserData', getUserData)
userRouter.get('/:id', getUserById)

export { userRouter }
