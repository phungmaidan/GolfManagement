import { createClient } from 'redis'
import logger from './logger.config.js'
import { env } from './environment.config.js'

let isRedisConnected = false

const redisClient = createClient({
  url: env.REDIS_URL,
  retry_strategy: function(options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      logger.error('Redis server refused connection')
      return new Error('Redis server refused connection')
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      logger.error('Redis retry time exhausted')
      return new Error('Redis retry time exhausted')
    }
    if (options.attempt > 10) {
      logger.error('Redis max retries reached')
      return new Error('Redis max retries reached')
    }
    return Math.min(options.attempt * 100, 3000)
  }
})

redisClient.on('error', (err) => {
  logger.error('Redis Client Error:', err.message)
  isRedisConnected = false
})

redisClient.on('connect', () => {
  logger.info('Redis Client Connected Successfully')
  isRedisConnected = true
})

redisClient.on('reconnecting', () => {
  logger.warn('Redis Client Reconnecting...')
  isRedisConnected = false
})

redisClient.on('end', () => {
  logger.warn('Redis Client Connection Ended')
  isRedisConnected = false
})

const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect()
    }
  } catch (error) {
    logger.error('Failed to connect to Redis:', error.message)
    isRedisConnected = false
    throw error
  }
}

const disconnectRedis = async () => {
  try {
    if (redisClient.isOpen) {
      await redisClient.disconnect()
      logger.info('Redis Client Disconnected Successfully')
      isRedisConnected = false
    }
  } catch (error) {
    logger.error('Failed to disconnect from Redis:', error.message)
    throw error
  }
}

const getRedisStatus = () => {
  return {
    isConnected: isRedisConnected,
    isOpen: redisClient.isOpen
  }
}

export { redisClient, connectRedis, disconnectRedis, getRedisStatus }