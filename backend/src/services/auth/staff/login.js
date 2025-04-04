import { StatusCodes } from 'http-status-codes'
import { v4 as uuidv4 } from 'uuid'
import db from '../../../models/index.js'
import { generateToken, generateRefreshToken } from '../token/generate-token.js'
import { redisClient } from '../../../config/redis.config.js'
import { CACHE_TTL } from '../../../utils/constant.utils.js'
const { SysOnUser, SysOnModule } = db

export const loginStaff = async (credentials) => {
    const { username, password } = credentials

    const user = await SysOnUser.findOne({
        attributes: ['id', 'name', 'userGroup', 'password', 'level', 'active'],
        where: { id: username },
        raw: true
    })

    if (!user) {
        const error = new Error('Staff user not found')
        error.statusCode = StatusCodes.NOT_FOUND
        throw error
    }

    if (!user.active) {
        const error = new Error('Staff account is deactivated')
        error.statusCode = StatusCodes.FORBIDDEN
        throw error
    }

    const isPasswordMatch = password === user.password
    if (!isPasswordMatch) {
        const error = new Error('Invalid password')
        error.statusCode = StatusCodes.UNAUTHORIZED
        throw error
    }

    const userInfo = {
        id: user.id,
        name: user.name,
        userGroup: user.userGroup,
        level: user.level,
        userType: 'staff'
    }

    const token = generateToken(userInfo)
    const refreshToken = generateRefreshToken(userInfo)

    const tokenId = uuidv4()
    await redisClient.set(
        `refresh_token:staff:${user.id}:${tokenId}`,
        refreshToken,
        'EX',
        CACHE_TTL.LONG_TERM
    )

    const modules = await SysOnModule.findAll({
        attributes: ['ID', 'Name'],
        raw: true,
        where: { Active: true },
        order: [['Sequence', 'ASC']]
    })

    return { user: userInfo, token, refreshToken, modules }
}