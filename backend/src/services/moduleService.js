import { moduleModel } from '~/models/moduleModel'

const getModuleData = async (moduleId, userId, moduleType) => {
  try {
    return await moduleModel.findModuleDetails({
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