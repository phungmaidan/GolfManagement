import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { StatusCodes } from 'http-status-codes'
import { redisClient } from '../../../config/redis.config.js'
import jwtConfig from '../../../config/jwt.config.js'
import db from '../../../models/index.js'
import { generateToken, generateRefreshToken } from './generate-token.js'

const { ComGuestAccount, SysOnUser } = db

/**
 * Refresh user's access token using refresh token
 * @param {string} refreshToken - Current refresh token
 * @returns {Promise<Object>} New access and refresh tokens
 * @throws {Error} If refresh token is invalid or user not found
 */
export const refreshUserToken = async (refreshToken) => {
    try {
        // Verify refresh token
        const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecret)

        // Check if token exists in Redis
        const tokenKey = await redisClient.keys(
            `refresh_token:${decoded.userType}:${decoded.id}:*`
        )

        if (tokenKey.length === 0) {
            const error = new Error('Invalid refresh token')
            error.statusCode = StatusCodes.UNAUTHORIZED
            throw error
        }

        // Verify stored token matches
        const storedToken = await redisClient.get(tokenKey[0])
        if (storedToken !== refreshToken) {
            const error = new Error('Invalid refresh token')
            error.statusCode = StatusCodes.UNAUTHORIZED
            throw error
        }

        // Get user based on type
        const user = decoded.userType === 'guest'
            ? await ComGuestAccount.findByPk(decoded.id)
            : await SysOnUser.findByPk(decoded.id)

        if (!user) {
            const error = new Error('User not found')
            error.statusCode = StatusCodes.NOT_FOUND
            throw error
        }

        // Generate new tokens
        const userInfo = {
            id: user.id,
            userType: decoded.userType,
            ...(decoded.userType === 'staff' ? {
                userGroup: user.userGroup,
                level: user.level
            } : {})
        }

        const newToken = generateToken(userInfo)
        const newRefreshToken = generateRefreshToken(userInfo)

        // Update refresh token in Redis
        const newTokenId = uuidv4()
        await redisClient.set(
            `refresh_token:${decoded.userType}:${user.id}:${newTokenId}`,
            newRefreshToken,
            'EX',
            60 * 60 * 24 * 7 // 7 days
        )

        // Delete old token
        await redisClient.del(tokenKey[0])

        return {
            token: newToken,
            refreshToken: newRefreshToken
        }
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            const customError = new Error('Invalid refresh token')
            customError.statusCode = StatusCodes.UNAUTHORIZED
            throw customError
        }
        throw error
    }
}