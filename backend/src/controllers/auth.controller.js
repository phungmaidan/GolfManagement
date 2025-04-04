import { StatusCodes } from 'http-status-codes'
import logger from '../config/logger.config.js'
import jwtConfig from '../config/jwt.config.js'
import { authService } from '../services/auth/index.js'

const loginStaff = async (req, res, next) => {
  try {
    const { user, token, refreshToken, modules } = await authService.loginStaff(req)

    // Set cookies
    res.cookie('refreshToken', refreshToken, jwtConfig.cookieOptions)
    res.cookie('accessToken', token, jwtConfig.cookieOptions)

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        accessToken: token,
        refreshToken: refreshToken,
        user: user,
        modules: modules
      }
    })
  } catch (error) {
    logger.error('Error in staff login controller:', error)
    next(error)
  }
}

const loginGuest = async (req, res, next) => {
  try {
    const { user, token, refreshToken } = await authService.loginGuest(req)

    // Set cookies
    res.cookie('refreshToken', refreshToken, jwtConfig.cookieOptions)
    res.cookie('accessToken', token, jwtConfig.cookieOptions)

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        accessToken: token,
        refreshToken: refreshToken,
        user: user
      }
    })
  } catch (error) {
    logger.error('Error in guest login controller:', error)
    next(error)
  }
}

const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!refreshToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: 'fail',
        message: 'No refresh token provided'
      })
    }

    const { token, newRefreshToken } = await authService.refreshUserToken(refreshToken)

    // Set cookie
    res.cookie('refreshToken', newRefreshToken, jwtConfig.cookieOptions)

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: { token }
    })
  } catch (error) {
    logger.error('Error in refreshToken controller:', error)
    next(error)
  }
}

export const authController = {
  loginStaff,
  loginGuest,
  refreshToken
}