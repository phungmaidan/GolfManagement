import Joi from 'joi'
import ApiError from '../../utils/apiError.utils.js'
import { StatusCodes } from 'http-status-codes'

export const getSchedules = async (req, res, next) => {
    const getSchedulesSchema = Joi.object({
        courseId: Joi.string().required().messages({
            'any.required': 'courseId is required'
        }),
        date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required().messages({
            'string.pattern.base': 'Invalid Date format (YYYY-MM-DD)',
            'any.required': 'Date is required'
        }),
        templateId: Joi.string().required().messages({
            'string.base': 'templateId must be a string',
            'any.required': 'templateId is required'
        }),
        session: Joi.string().valid('Morning', 'Afternoon').required().messages({
            'any.only': 'Session must be either Morning or Afternoon',
            'any.required': 'Session is required'
        }),
    })
    try {
        // Gộp cả req.params thành một object để validate
        const validatedData = await getSchedulesSchema.validateAsync(
            { ...req.body },
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