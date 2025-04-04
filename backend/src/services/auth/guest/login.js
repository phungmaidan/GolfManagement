import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'
import { v4 as uuidv4 } from 'uuid'
import db from '../../../models/index.js'
import { generateToken, generateRefreshToken } from '../token/generate-token.js'
import { redisClient } from '../../../config/redis.config.js'
import { CACHE_TTL } from '../../../utils/constant.utils.js'
const { ComGuestAccount } = db

export const loginGuest = async (credentials) => {
    const { username, password } = credentials

    const user = await ComGuestAccount.findOne({
        where: { Username: username },
        raw: true
    })

    if (!user) {
        const error = new Error('Guest account not found')
        error.statusCode = StatusCodes.NOT_FOUND
        throw error
    }

    if (user.AccountStatus !== 1) {
        const error = new Error('Guest account is not active')
        error.statusCode = StatusCodes.FORBIDDEN
        throw error
    }

    const isPasswordMatch = await bcrypt.compare(password, user.PasswordHash)
    if (!isPasswordMatch) {
        const error = new Error('Invalid password')
        error.statusCode = StatusCodes.UNAUTHORIZED
        throw error
    }

    const userInfo = {
        id: user.GuestID,
        username: user.Username,
        displayName: user.DisplayName,
        userType: 'guest'
    }

    const token = generateToken(userInfo)
    const refreshToken = generateRefreshToken(userInfo)

    const tokenId = uuidv4()
    await redisClient.set(
        `refresh_token:guest:${user.GuestID}:${tokenId}`,
        refreshToken,
        'EX',
        CACHE_TTL.LONG_TERM
    )

    return { user: userInfo, token, refreshToken }
}