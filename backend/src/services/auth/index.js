import { loginGuest } from './guest/login.js'
import { loginStaff } from './staff/login.js'
import { refreshUserToken } from './token/refresh-token.js'
import { generateToken, generateRefreshToken } from './token/generate-token.js'

export const authService = {
    loginGuest,
    loginStaff,
    refreshUserToken,
    generateToken,
    generateRefreshToken
}
