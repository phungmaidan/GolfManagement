import { redisClient } from '../config/redis.config.js'
import logger from '../config/logger.config.js'
import { v4 as uuidv4 } from 'uuid'

/**
 * Acquire a Redis lock with a timeout
 * @param {string} key - Lock key name
 * @param {number} ttl - Time to live in seconds
 * @returns {Promise<boolean>} - Whether the lock was acquired
 */
export const acquireLock = async (key, ttl = 30) => {
  const lockId = uuidv4()
  const lockKey = `lock:${key}`

  try {
    // NX option ensures we only set if the key doesn't exist
    const result = await redisClient.set(lockKey, lockId, {
      NX: true,
      EX: ttl
    })

    if (result === 'OK') {
      logger.debug(`Lock acquired: ${lockKey}`)
      return true
    }

    logger.debug(`Failed to acquire lock: ${lockKey}`)
    return false
  } catch (error) {
    logger.error(`Error acquiring lock: ${error.message}`)
    return false
  }
}

/**
 * Release a Redis lock
 * @param {string} key - Lock key name
 * @returns {Promise<boolean>} - Whether the lock was released
 */
export const releaseLock = async (key) => {
  const lockKey = `lock:${key}`

  try {
    await redisClient.del(lockKey)
    logger.debug(`Lock released: ${lockKey}`)
    return true
  } catch (error) {
    logger.error(`Error releasing lock: ${error.message}`)
    return false
  }
}

/**
 * Set cache with expiration
 * @param {string} key - Cache key
 * @param {any} value - Value to cache
 * @param {number} ttl - Time to live in seconds
 */
export const setCache = async (key, value, ttl = 3600) => {
  try {
    await redisClient.set(key, JSON.stringify(value), 'EX', ttl)
    logger.debug(`Cache set: ${key}`)
  } catch (error) {
    logger.error(`Error setting cache: ${error.message}`)
  }
}

/**
 * Get cache
 * @param {string} key - Cache key
 * @returns {Promise<any>} - Cached value or null
 */
export const getCache = async (key) => {
  try {
    const data = await redisClient.get(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    logger.error(`Error getting cache: ${error.message}`)
    return null
  }
}

/**
 * Delete cache
 * @param {string} key - Cache key
 */
export const deleteCache = async (key) => {
  try {
    await redisClient.del(key)
    logger.debug(`Cache deleted: ${key}`)
  } catch (error) {
    logger.error(`Error deleting cache: ${error.message}`)
  }
}

/**
 * Delete cache pattern
 * @param {string} pattern - Cache key pattern
 */
export const deleteCachePattern = async (pattern) => {
  try {
    const keys = await redisClient.keys(pattern)
    if (keys.length > 0) {
      await redisClient.del(keys)
      logger.debug(`Cache pattern deleted: ${pattern}, keys: ${keys.length}`)
    }
  } catch (error) {
    logger.error(`Error deleting cache pattern: ${error.message}`)
  }
}