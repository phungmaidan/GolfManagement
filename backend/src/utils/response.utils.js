import { StatusCodes } from 'http-status-codes'

/**
 * Creates a standardized success response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {object} data - Response data
 */
export const successResponse = (res, statusCode = StatusCodes.OK, message = 'Success', data = {}) => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data
  })
}

/**
 * Creates a standardized error response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {object} errors - Error details
 */
export const errorResponse = (res, statusCode = StatusCodes.BAD_REQUEST, message = 'Error', errors = null) => {
  const response = {
    status: 'fail',
    message
  }

  if (errors) {
    response.errors = errors
  }

  return res.status(statusCode).json(response)
}

/**
 * Creates a standardized pagination response
 * @param {Array} data - Data array
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items count
 */
export const paginationResponse = (data, page = 1, limit = 10, total = 0) => {
  return {
    data,
    pagination: {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      total,
      pages: Math.ceil(total / limit)
    }
  }
}