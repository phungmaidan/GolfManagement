import jwt from 'jsonwebtoken'
import jwtConfig from '../../../config/jwt.config.js'

/**
 * Generate access token for user
 * @param {Object} user - User information
 * @param {string} user.id - User ID
 * @param {string} user.userType - Type of user (staff/guest)
 * @param {string} [user.userGroup] - User group (for staff only)
 * @param {number} [user.level] - User level (for staff only)
 * @returns {string} Access token
 */
export const generateToken = (user) => {
    const payload = {
        id: user.id,
        userType: user.userType
    }

    // Add additional staff information if user is staff
    if (user.userType === 'staff') {
        payload.userGroup = user.userGroup
        payload.level = user.level
    }

    return jwt.sign(
        payload,
        jwtConfig.secret,
        { expiresIn: jwtConfig.tokenExpiration }
    )
}

/**
 * Generate refresh token for user
 * @param {Object} user - User information
 * @param {string} user.id - User ID
 * @param {string} user.userType - Type of user (staff/guest)
 * @returns {string} Refresh token
 */
export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            userType: user.userType
        },
        jwtConfig.refreshSecret,
        { expiresIn: jwtConfig.refreshTokenExpiration }
    )
}