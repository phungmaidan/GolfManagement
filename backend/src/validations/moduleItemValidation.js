import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const moduleItemSchema = Joi.object({
  itemName: Joi.string().required().messages({
    'any.required': 'Item Name is required'
  })
})

const getItemData = async (req, res, next) => {
  try {
    await moduleItemSchema.validateAsync(req.params, { abortEarly: false })
    req.itemName = req.params.itemName
    req.CourseID = req.query.CourseID
    next()
  } catch (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ')
    next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage))
  }
}

export const moduleItemValidation = {
  getItemData
}