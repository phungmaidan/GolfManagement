import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const getCourse = async (req, res, next) => {
  const getCourseSchema = Joi.object({
    date: Joi.string().pattern(/^\d{4}\/\d{2}\/\d{2}$/).required().messages({
      'string.pattern.base': 'Invalid Date format (YYYY/MM/DD)',
      'any.required': 'Date is required'
    })
  })

  try {
    if (req.query.date) {
      req.query.date = req.query.date.replace(/-/g, '/')
    }
    const validatedData = await getCourseSchema.validateAsync(req.query, { abortEarly: false })
    req.validatedData = validatedData
    next()
  } catch (error) {
    const errorMessage = error.details
      ? error.details.map(detail => detail.message).join(', ')
      : error.message
    next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage))
  }
}

const getSchedule = async (req, res, next) => {
  const getScheduleSchema = Joi.object({
    CourseID: Joi.string().required().messages({
      'any.required': 'CourseID is required'
    }),
    date: Joi.string().pattern(/^\d{4}\/\d{2}\/\d{2}$/).required().messages({
      'string.pattern.base': 'Invalid Date format (YYYY-MM-DD)',
      'any.required': 'Date is required'
    })
  })
  try {
    if (req.query.date) {
      req.query.date = req.query.date.replace(/-/g, '/')
    }
    const validatedData = await getScheduleSchema.validateAsync(req.query, { abortEarly: false })
    req.validatedData = validatedData
    next()
  } catch (error) {
    const errorMessage = error.details
      ? error.details.map(detail => detail.message).join(', ')
      : error.message
    next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage))
  }
}

const searchGuests = async (req, res, next) => {
  const schema = Joi.object({
    search: Joi.string().required().min(1).messages({
      'string.empty': 'Search term cannot be empty',
      'any.required': 'Search term is required'
    }),
    limit: Joi.number().integer().min(1).max(20).default(5)
  })

  try {
    const validatedData = await schema.validateAsync(req.query, { abortEarly: false })
    req.validatedData = validatedData
    next()
  } catch (error) {
    const errorMessage = error.details
      ? error.details.map(detail => detail.message).join(', ')
      : error.message
    next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage))
  }
}

export const itemValidation = {
  getCourse,
  getSchedule,
  searchGuests
}
