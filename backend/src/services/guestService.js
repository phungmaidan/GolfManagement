/* eslint-disable no-useless-catch */
import { guestModel } from '~/models/guestModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import bcryptjs from 'bcryptjs'
import { pickGuest } from '~/utils/formatters'
import { env } from '~/config/environment'
import { JwtProvider } from '~/providers/JwtProvider'
import { ACCOUNT_STATUS } from '~/utils/constants'
const login = async (reqBody) => {
  try {
    const existGuest = await guestModel.findOneByAccount({
      account: reqBody.account,
      fields: ['GuestID', 'Username', 'PasswordHash', 'Salt', 'AccountStatus', 'DisplayName'],
      execute: true
    })

    if (!existGuest) throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')
    if (existGuest.AccountStatus !== ACCOUNT_STATUS.ACTIVE) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your account is not active!')
    const providedPasswordHash = bcryptjs.hashSync(reqBody.password, existGuest.Salt)
    if (providedPasswordHash !== existGuest.PasswordHash) {
      throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your Account or Password is incorrect!')
    }

    const guestInfo = { _id: existGuest.GuestID, _username: existGuest.Username }

    const accessToken = await JwtProvider.generateToken(
      guestInfo,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      env.ACCESS_TOKEN_LIFE
    )

    const refreshToken = await JwtProvider.generateToken(
      guestInfo,
      env.REFRESH_TOKEN_SECRET_SIGNATURE,
      env.REFRESH_TOKEN_LIFE
    )

    return { accessToken, refreshToken, ...pickGuest(existGuest) }

  } catch (error) { throw error }
}

const refreshToken = async (clientRefreshToken) => {
  try {
    const refreshTokenDecoded = await JwtProvider.verifyToken(
      clientRefreshToken,
      env.REFRESH_TOKEN_SECRET_SIGNATURE
    )

    const guestInfo = {
      _id: refreshTokenDecoded._id
    }

    const accessToken = await JwtProvider.generateToken(
      guestInfo,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      env.ACCESS_TOKEN_LIFE
    )

    return { accessToken }
  } catch (error) { throw error }
}

export const guestService = {
  login,
  refreshToken
}
