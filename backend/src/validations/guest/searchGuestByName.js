import Joi from 'joi'
import ApiError from '../../utils/apiError.utils.js'
import { StatusCodes } from 'http-status-codes'

export const searchGuest = async (req, res, next) => {
    const searchGuestByNameSchema = Joi.object({
        guestName: Joi.string().required()
    })

    try {
        const validatedData = await searchGuestByNameSchema.validateAsync(
            { ...req.query },
            { abortEarly: false }
        )
        Object.assign(req, validatedData)
        next()
    } catch (error) {
        return next(new ApiError(StatusCodes.BAD_REQUEST, error.message))
    }
}