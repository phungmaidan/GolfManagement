import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import jwtConfig from '../config/jwt.config.js'
import logger from '../config/logger.config.js'

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.accessToken

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: 'fail',
      message: 'No token provided'
    })
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret)
    // Add user info to request
    req.userId = decoded.id
    req.user = { role: decoded.role }

    next()
  } catch (error) {
    logger.error('JWT verification failed:', error)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: 'fail',
      message: 'Invalid token'
    })
  }
}

export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(StatusCodes.FORBIDDEN).json({
      status: 'fail',
      message: 'Requires admin privileges'
    })
  }

  next()
}