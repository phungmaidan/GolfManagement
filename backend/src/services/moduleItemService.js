import { moduleItemModel } from '~/models/moduleItemModel'

const getTemplateSchedule = async (CourseID, itemName, selectedDate) => {

  if (itemName === 'daily-operation') {
    return await moduleItemModel.getTeeTimeTemplate(CourseID, selectedDate)
    
  }
}

export const moduleItemService = {
  getTemplateSchedule
}
