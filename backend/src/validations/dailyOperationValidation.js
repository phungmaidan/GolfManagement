import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const getInfo = async (req, res, next) => {
    const getCourseSchema = Joi.object({
        selectedDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required().messages({
            'string.pattern.base': 'Invalid Date format (YYYY-MM-DD)',
            'any.required': 'Date is required'
        })
    });
    try {
        const validatedData = await getCourseSchema.validateAsync(req.query, { abortEarly: false })
        req.selectedDate = validatedData.selectedDate
        next();
    } catch (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage));
    }
};

export const dailyOperationValidation = {
    getInfo
};
