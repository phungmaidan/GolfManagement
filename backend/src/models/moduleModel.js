import { sqlQueryUtils } from '~/utils/sqlQueryUtils'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const findModuleOptionType = async ({ moduleId, userId, optionType, fields = ['ItemID', 'ItemName', 'OptionType', 'ModuleID'], execute = true }) => {
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
      },
      execute: execute
    })
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, error.message)
  }
}

const findDailyOperationData = async ({ flightStatusFields = ['*'], guestTypeFields = ['*'], execute = true }) => {
  try {
    const [flightStatuses, guestTypes] = await Promise.all([
      sqlQueryUtils.queryBuilder({
        tableName: 'FreFlightStatus',
        fields: flightStatusFields,
        execute: execute
      }),
      sqlQueryUtils.queryBuilder({
        tableName: 'ComGuestType',
        fields: guestTypeFields,
        execute: execute
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