import { sqlQueryUtils } from '~/utils/sqlQueryUtils'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

// Hàm tìm kiếm module option type
const findModuleOptionType = async (moduleId, userId, optionType, fields = ['ItemID', 'ItemName', 'OptionType', 'ModuleID']) => {
  try {
    return await sqlQueryUtils.queryBuilder({
      tableName: 'sysOnUserMenuView',
      fields: fields,
      where: `
        ModuleID = @ModuleID 
        AND OptionType = @OptionType 
        AND ID = @ID 
        AND PrimaryItemID IS NULL
        AND Active = 1
        ORDER BY ItemSequence
      `,
      params: { 
        ModuleID: moduleId, 
        ID: userId, 
        OptionType: optionType 
      }
    })
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, error.message)
  }
}

// Hàm tìm kiếm dữ liệu hoạt động hàng ngày
const findDailyOperationData = async (flightStatusFields = ['*'], guestTypeFields = ['*']) => {
  try {
    const [flightStatuses, guestTypes] = await Promise.all([
      sqlQueryUtils.queryBuilder({
        tableName: 'FreFlightStatus',
        fields: flightStatusFields
      }),
      sqlQueryUtils.queryBuilder({
        tableName: 'ComGuestType',
        fields: guestTypeFields
      })
    ])

    return {
      flightStatuses,
      guestTypes
    }
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, error.message)
  }
}

export const moduleModel = {
  findModuleOptionType,
  findDailyOperationData
}