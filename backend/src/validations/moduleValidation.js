import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const moduleSchema = Joi.object({
  moduleId: Joi.string().required().messages({
    'any.required': 'Module ID is required'
  }),
  moduleType: Joi.string().valid('Tasks', 'Reports', 'Setting').required().messages({
    'any.required': 'Module type is required',
    'any.only': 'Module type must be one of [Tasks, Reports, Setting]'
  })
})

const getModuleData = async (req, res, next) => {
  try {
    await moduleSchema.validateAsync(req.params, { abortEarly: false })
    req.moduleType = req.params.moduleType
    next()
  } catch (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ')
    next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage))
  }
}

export const moduleValidation = {
  getModuleData
}