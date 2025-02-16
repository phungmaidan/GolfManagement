import { moduleModel } from '~/models/moduleModel'

const getModuleData = async (moduleId, userId, moduleType, itemName) => {
  try {
    if (moduleType === 'Tasks' && itemName === 'Daily Operation') {
      return await moduleModel.findDailyOperationData({
        flightStatusFields: ['*'],
        guestTypeFields: ['*'],
        execute: true
      })
    }
    return await moduleModel.findModuleOptionType({
      moduleId: moduleId,
      userId: userId,
      optionType: moduleType,
      fields: ['ItemID', 'ItemName', 'OptionType', 'ModuleID'],
      execute: true
    })
  } catch (error) {
    throw error
  }
}

export const moduleService = {
  getModuleData
}