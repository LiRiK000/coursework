import jwt from 'jsonwebtoken'

export const validateJWT = (token) => {
  if (!token) {
    return null
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    return decodedToken
  } catch (error) {
    console.error('Token validation error:', error.message)
    return null
  }
}
