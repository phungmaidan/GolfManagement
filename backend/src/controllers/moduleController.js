import { StatusCodes } from 'http-status-codes'
import { moduleService } from '~/services/moduleService'
import ApiError from '~/utils/ApiError'

const getModuleData = async (req, res, next) => {
  try {
    const { moduleId, moduleType } = req.params
    const userId = req.jwtDecoded._id
    const { itemName } = req.query
    const data = await moduleService.getModuleData(moduleId, userId, moduleType, itemName)
    res.status(StatusCodes.OK).json(data)
  } catch (error) {
    next(new ApiError(StatusCodes.FORBIDDEN, 'You don\'t have permission'))
  }
}

export const moduleController = {
  getModuleData
}
