import { moduleModel } from '~/models/moduleModel'

const getModuleData = async (moduleId, userId, moduleType, itemName) => {
  try {
    if (moduleType === 'Tasks' && itemName === 'Daily Operation') {
      return await moduleModel.findDailyOperationData()
    }
    return await moduleModel.findModuleOptionType(moduleId, userId, moduleType)
  } catch (error) {
    throw error // Bắt lỗi và chuyển tiếp
  }
}

export const moduleService = {
  getModuleData
}