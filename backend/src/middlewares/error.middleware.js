import { StatusCodes } from 'http-status-codes'
import logger from '../config/logger.config.js'

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  const message = err.message || 'Something went wrong'

  // Log detailed error for server-side debugging
  logger.error(`Error: ${message}`, {
    error: err,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
    user: req.userId
  })

  // Send simplified error response to client
  return res.status(statusCode).json({
    status: statusCode >= 500 ? 'error' : 'fail',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}

export default errorMiddleware