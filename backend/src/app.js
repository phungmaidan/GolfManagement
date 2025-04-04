import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { createServer } from 'http'
import { Server } from 'socket.io'
import routes from './routes/v1/index.js'
import errorMiddleware from './middlewares/error.middleware.js'
import logger from './config/logger.config.js'
import { connectRedis } from './config/redis.config.js'
import initializeSocket from './sockets/booking.socket.js'
import path from 'path'
import { fileURLToPath } from 'url'
import asyncExitHook from 'async-exit-hook'
import db from './models/index.js'
import { env } from './config/environment.config.js'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import compression from 'compression'
// ES modules compatibility
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: env.CORS_ORIGIN,
    credentials: true
  }
})

// Middleware
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Security middleware
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS, // 15 minutes
  max: env.RATE_LIMIT_MAX // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// Initialize socket.io
initializeSocket(io)

// API routes
app.use('/api/v1', routes)

// Error handling middleware
app.use(errorMiddleware)

// Connect to Redis
connectRedis().catch(err => {
  logger.error('Redis connection error:', err)
})

// Graceful shutdown
asyncExitHook(callback => {
  logger.info('Shutting down application...')

  // Close database connection
  db.sequelize.close()
    .then(() => {
      logger.info('Database connection closed')
      callback()
    })
    .catch(err => {
      logger.error('Error closing database connection:', err)
      callback()
    })
})

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.use(compression())

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

export { app, httpServer }