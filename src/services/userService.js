/* eslint-disable no-useless-catch */
import { userModel } from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import bcryptjs from 'bcryptjs'
import { pickUser } from '~/utils/formatters'
import { env } from '~/config/environment'
import { JwtProvider } from '~/providers/JwtProvider'

const login = async (reqBody) => {
  try {
    const existUser = await userModel.findOneByAccount(reqBody.account)

    if (!existUser) throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')
    if (!existUser.Active) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your account is not active!')
    console.log(existUser.Password)
    console.log(reqBody.password)
    // if (!bcryptjs.compareSync(reqBody.password, existUser.Password)) {
    //   throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your Account or Password is incorrect!')
    // }

    const userInfo = { _id: existUser.ID }

    const accessToken = await JwtProvider.generateToken(
      userInfo,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      env.ACCESS_TOKEN_LIFE
    )

    const refreshToken = await JwtProvider.generateToken(
      userInfo,
      env.REFRESH_TOKEN_SECRET_SIGNATURE,
      env.REFRESH_TOKEN_LIFE
    )

    return { accessToken, refreshToken, ...pickUser(existUser) }

  } catch (error) { throw error }
}

const refreshToken = async (clientRefreshToken) => {
  try {
    const refreshTokenDecoded = await JwtProvider.verifyToken(
      clientRefreshToken,
      env.REFRESH_TOKEN_SECRET_SIGNATURE
    )

    const userInfo = {
      _id: refreshTokenDecoded._id
    }

    const accessToken = await JwtProvider.generateToken(
      userInfo,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      env.ACCESS_TOKEN_LIFE
    )

    return { accessToken }
  } catch (error) { throw error }
}

export const userService = {
  login,
  refreshToken
}
