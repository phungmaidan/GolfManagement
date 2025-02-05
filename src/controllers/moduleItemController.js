import { StatusCodes } from 'http-status-codes'
import { moduleItemService } from '~/services/moduleItemService'
import ApiError from '~/utils/ApiError'

const getItemData = async (req, res, next) => {
  try {
    const { itemName } = req.params
    const { CourseID } = req.query
    const data = await moduleItemService.getItemData(CourseID, itemName)
    res.status(StatusCodes.OK).json(data)
  } catch (error) {
    next(new ApiError(StatusCodes.FORBIDDEN, 'You don\'t have permission'))
  }
}

export const moduleItemController = {
  getItemData
}