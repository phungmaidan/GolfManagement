import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
//import { EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'

const loginSchema = Joi.object({
  account: Joi.string().required().messages({
    'any.required': 'Account is required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required'
  })
})

const login = async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const errorMessage = error.details
      ? error.details.map(detail => detail.message).join(', ')
      : error.message;
    next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage))
  }
}

export const userValidation = {
  login
}
