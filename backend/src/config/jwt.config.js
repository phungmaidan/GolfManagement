import { env } from './environment.config.js'
import ms from 'ms'
export default {
  secret: env.JWT_SECRET,
  refreshSecret: env.JWT_REFRESH_SECRET,
  tokenExpiration: env.JWT_EXPIRATION || '1h',
  refreshTokenExpiration: env.JWT_REFRESH_EXPIRATION || '7d',
  cookieOptions: {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    // sameSite: 'strict',
    maxAge: ms('14 days') // 1 day
  }
}