import Joi from 'joi'
import ApiError from '../../utils/apiError.utils.js'
import { StatusCodes } from 'http-status-codes'

export const login = async (req, res, next) => {
    const loginSchema = Joi.object({
        username: Joi.string().required().messages({
            'any.required': 'Username is required'
        }),
        password: Joi.string().required().messages({
            'any.required': 'Password is required'
        })
    })
    try {
        const validatedData = await loginSchema.validateAsync(
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
