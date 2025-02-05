import { moduleModel } from '~/models/moduleModel'

const getModuleOptionType = (moduleId, userId, moduleType) => {
  return moduleModel.findModuleOptionType(moduleId, userId, moduleType)
}

export const moduleService = {
  getModuleOptionType
}
