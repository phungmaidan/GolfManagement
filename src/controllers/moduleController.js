import { StatusCodes } from 'http-status-codes'
import { moduleService } from '~/services/moduleService'
import ApiError from '~/utils/ApiError'

const getModuleData = async (req, res, next) => {
  try {
    const { moduleId } = req.params
    const userId = req.jwtDecoded._id
    const moduleType = req.moduleType

    const data = await moduleService.getModuleOptionType(moduleId, userId, moduleType)
    res.status(StatusCodes.OK).json(data)
  } catch (error) {
    next(new ApiError(StatusCodes.FORBIDDEN, 'You don\'t have permission'))
  }
}

export const moduleController = {
  getModuleData
}
