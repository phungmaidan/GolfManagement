import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'


const getModuleData = async (req, res, next) => {
  const moduleSchema = Joi.object({
    moduleId: Joi.string().required().messages({
      'any.required': 'Module ID is required'
    }),
    moduleType: Joi.string().valid('Tasks', 'Reports', 'Setting').required().messages({
      'any.required': 'Module type is required',
      'any.only': 'Module type must be one of [Tasks, Reports, Setting]'
    }),
    itemName: Joi.string().optional().messages({
      'any.base': 'Item name must be a string'
    })
  })
  try {
    // Gộp cả req.params và req.query thành một object để validate
    const validatedData = await moduleSchema.validateAsync(
      { ...req.params, ...req.query },
      { abortEarly: false }
    );
    // Gán dữ liệu đã validate vào req để sử dụng trong middleware tiếp theo
    Object.assign(req, validatedData);
    next()
  } catch (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ')
    next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage))
  }
}

export const moduleValidation = {
  getModuleData
}