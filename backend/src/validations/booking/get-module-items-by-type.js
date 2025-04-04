import Joi from 'joi'
import ApiError from '../../utils/apiError.utils.js'
import { StatusCodes } from 'http-status-codes'
export const getModuleItemsByType = async (req, res, next) => {
    const getModuleItemsByTypeSchema = Joi.object({
        moduleId: Joi.string().required().messages({
            'any.required': 'Module ID is required'
        }),
        type: Joi.string().valid('Tasks', 'Reports', 'Settings').required().messages({
            'any.required': 'Module type is required',
            'any.only': 'Module type must be one of [Tasks, Reports, Setting]'
        })
    })
    try {
        // Gộp cả req.params thành một object để validate
        const validatedData = await getModuleItemsByTypeSchema.validateAsync(
            { ...req.params },
            { abortEarly: false }
        )
        Object.assign(req, validatedData)
        next()
    } catch (error) {
        const errorMessage = error.details
            ? error.details.map(detail => detail.message).join(', ')
            : error.message
        next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage))
    }
}