import { StatusCodes } from 'http-status-codes'
import logger from '../config/logger.config.js'

const validate = (schema, source = 'body') => (req, res, next) => {
  const dataToValidate = req[source]
  console.log(dataToValidate)
  const { error } = schema.validate(dataToValidate, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  })

  if (error) {
    const errorDetails = error.details.map(detail => ({
      message: detail.message,
      path: detail.path
    }))

    logger.debug(`Validation error in ${source}:`, errorDetails)

    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'fail',
      message: 'Validation error',
      errors: errorDetails
    })
  }

  // Validation successful
  next()
}

export default validate