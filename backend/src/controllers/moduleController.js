import { StatusCodes } from 'http-status-codes'
import { moduleService } from '~/services/moduleService'


const getModuleData = async (req, res, next) => {
  try {
    const { moduleId, moduleType } = req // Lấy giá trị từ req
    const userId = req.jwtDecoded._id
    const data = await moduleService.getModuleData(moduleId, userId, moduleType)
    res.status(StatusCodes.OK).json(data)
  } catch (error) { next(error) }
}

export const moduleController = {
  getModuleData
}
