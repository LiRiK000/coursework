import { ApiResponse } from '../utils/ApiResponse.js'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/db/prisma.js'

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return res
        .status(401)
        .json(new ApiResponse(false, 401, null, 'Unauthorized request'))
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    })

    if (!user) {
      return res
        .status(401)
        .json(new ApiResponse(false, 401, null, 'Invalid Access Token'))
    }

    req.user = user
    next()
  } catch (error) {
    return res
      .status(401)
      .json(
        new ApiResponse(
          false,
          401,
          null,
          error.message || 'Invalid access token',
        ),
      )
  }
}
