// ~/models/moduleModel.js
import { queryBuilder } from '~/utils/dbUtils'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

// Hàm tìm kiếm module option type
const findModuleOptionType = async (moduleId, userId, optionType) => {
  const fields = ['ItemID', 'ItemName', 'OptionType', 'ModuleID']
  const where = `
    ModuleID = @ModuleID 
    AND OptionType = @OptionType 
    AND ID = @ID 
    AND PrimaryItemID IS NULL
    AND Active = 1
    ORDER BY ItemSequence
  `
  const params = { ModuleID: moduleId, ID: userId, OptionType: optionType }
  return await queryBuilder('sysOnUserMenuView', fields, where, params)
}

// Hàm tìm kiếm dữ liệu hoạt động hàng ngày
const findDailyOperationData = async () => {
  const flightStatusFields = ['*']
  const guestTypeFields = ['*']

  try {
    const [flightStatuses, guestTypes] = await Promise.all([
      queryBuilder('FreFlightStatus', flightStatusFields),
      queryBuilder('ComGuestType', guestTypeFields),
    ])

    return {
      flightStatuses,
      guestTypes,
    }
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, error.message)
  }
}

export const moduleModel = {
  findModuleOptionType,
  findDailyOperationData
}