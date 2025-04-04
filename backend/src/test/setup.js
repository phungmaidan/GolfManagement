import dotenv from 'dotenv'
import path from 'path'
import { jest } from '@jest/globals'

// Load test environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.test') })

// Set test environment
process.env.NODE_ENV = 'test'

// Mock Redis
jest.mock('../config/redis.config.js', () => ({
  connectRedis: jest.fn().mockResolvedValue(true)
}))

// Mock JWT
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mock-token'),
  verify: jest.fn().mockReturnValue({ userId: 1 })
}))

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  compare: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue('hashed-password')
}))

// Global test timeout
jest.setTimeout(10000)