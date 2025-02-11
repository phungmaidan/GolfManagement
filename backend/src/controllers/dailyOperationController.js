import { StatusCodes } from 'http-status-codes'
import { dailyOperationService } from '~/services/dailyOperationService'

const getInfo = async (req, res, next) => {
  try {
    const data = await dailyOperationService.getInfo()
    res.status(StatusCodes.OK).json(data)
  } catch (error) { next(error) }
}

export const dailyOperationController = {
  getInfo
}
