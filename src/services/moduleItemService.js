import { moduleItemModel } from '~/models/moduleItemModel'

const getItemData = async (CourseID, itemName) => {
  if (itemName === 'daily-operation') {
    return moduleItemModel.getTeeTimeTemplate(CourseID)
    
  }
}

export const moduleItemService = {
  getItemData
}
