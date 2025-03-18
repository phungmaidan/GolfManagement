/* eslint-disable no-useless-catch */
import { guestModel } from '~/models/guestModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import bcryptjs from 'bcryptjs'
import { getDayOfWeek, pickGuest } from '~/utils/formatters'
import { env } from '~/config/environment'
import { JwtProvider } from '~/providers/JwtProvider'
import { ACCOUNT_STATUS } from '~/utils/constants'
import { itemModel } from '~/models/itemModel'
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
    const guestDetail = await guestModel.getGuestDetail({
      guestId: existGuest.GuestID,
      fields: ['*'],
      execute: true
    })
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

    return { accessToken, refreshToken, ...pickGuest(existGuest), guestDetail }

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

const getSchedule = async (CourseID, date) => {
  try {
    const dateOfWeek = getDayOfWeek(date)
    const fetchTemplate = await itemModel.fetchTemplateOfDay({
      CourseID: CourseID,
      fields: [dateOfWeek],
      execute: true
    })
    const TemplateID = fetchTemplate[dateOfWeek]
    if (!TemplateID) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `No template found for course ${CourseID} on ${dateOfWeek}`
      )
    }

    // First call to create/fetch tee time data
    let TeeTimeInfo = await itemModel.fetchTeeTimeMaster({
      CourseID: CourseID,
      txnDate: date,
      TemplateID: TemplateID,
      execute: true
    })

    // Add retry logic with delay to ensure data is created
    let retryCount = 0
    const maxRetries = 3
    const delayMs = 1000 // 1 second delay

    while ((!TeeTimeInfo || TeeTimeInfo.length === 0) && retryCount < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, delayMs))

      TeeTimeInfo = await itemModel.fetchTeeTimeMaster({
        CourseID: CourseID,
        txnDate: date,
        TemplateID: TemplateID,
        execute: true
      })

      retryCount++
    }

    if (!TeeTimeInfo || TeeTimeInfo.length === 0) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `No tee time information found for course ${CourseID} on ${date} after ${maxRetries} attempts`
      )
    }

    const MorningSession = await itemModel.fetchTeeTimeDetailsBySession({
      CourseID: CourseID,
      txnDate: date,
      Session: 'Morning',
      execute: true
    })

    const AfternoonSession = await itemModel.fetchTeeTimeDetailsBySession({
      CourseID: CourseID,
      txnDate: date,
      Session: 'Afternoon',
      execute: true
    })

    return {
      MorningSession: MorningSession,
      AfternoonSession: AfternoonSession
    }
  } catch (error) { throw error }
}

const saveBooking = async (bookingData) => {
  // const bookingId = await itemModel.generateBookingId({ playDate: bookingData.playDate })
  // const booking = await itemModel.saveBooking({ bookingId, ...bookingData })
  return bookingData
}

export const guestService = {
  login,
  refreshToken,
  saveBooking,
  getSchedule
}
