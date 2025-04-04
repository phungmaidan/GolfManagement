import Joi from 'joi'
import ApiError from '../../utils/apiError.utils.js'
import { StatusCodes } from 'http-status-codes'
export const getCoursesByDate = async (req, res, next) => {
    const getCourseByDateSchema = Joi.object({
        date: Joi.string().pattern(/^\d{4}\/\d{2}\/\d{2}$/).required().messages({
            'string.pattern.base': 'Invalid Date format (YYYY/MM/DD)',
            'any.required': 'Date is required'
        })
    })
    try {
        if (req.query.date) {
            req.query.date = req.query.date.replace(/-/g, '/')
        }
        const validatedData = await getCourseByDateSchema.validateAsync(
            req.query, 
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