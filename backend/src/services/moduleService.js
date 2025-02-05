import { moduleModel } from '~/models/moduleModel'

const getModuleData = async (moduleId, userId, moduleType, itemName) => {
  if (moduleType === 'Tasks' && itemName === 'Daily Operation') {
    return moduleModel.findDailyOperationData()
  }
  return moduleModel.findModuleOptionType(moduleId, userId, moduleType)
}

export const moduleService = {
  getModuleData
}
