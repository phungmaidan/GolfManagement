import request from 'supertest'
import { app } from '../app.js'
import { StatusCodes } from 'http-status-codes'
import db from '../models/index.js'
import { env } from '../config/environment.config.js'
import { describe, beforeAll, afterAll, beforeEach, afterEach, it, expect } from '@jest/globals'
import { mockUser, mockLoginRequest, mockLoginResponse } from './mocks/user.mock.js'

describe('Auth API', () => {
  beforeAll(async () => {
    // Connect to test database
    await db.sequelize.sync({ force: true })
  })

  afterAll(async () => {
    // Close database connection
    await db.sequelize.close()
  })

  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      // Create test user before each test
      await db.User.create(mockUser)
    })

    afterEach(async () => {
      // Clean up after each test
      await db.User.destroy({ where: { username: mockUser.username } })
    })

    it('should login successfully with valid credentials', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send(mockLoginRequest)

      expect(response.status).toBe(StatusCodes.OK)
      expect(response.body).toEqual(mockLoginResponse)
    })

    it('should return 401 with invalid credentials', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          ...mockLoginRequest,
          password: 'wrongpassword'
        })

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
      expect(response.body.status).toBe('fail')
    })

    it('should return 400 with missing required fields', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          username: mockLoginRequest.username
        })

      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
      expect(response.body.status).toBe('fail')
    })

    it('should return 400 with invalid username format', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          ...mockLoginRequest,
          username: ''
        })

      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
      expect(response.body.status).toBe('fail')
    })

    it('should set cookies on successful login', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send(mockLoginRequest)

      expect(response.status).toBe(StatusCodes.OK)
      expect(response.headers['set-cookie']).toBeDefined()
      expect(response.headers['set-cookie']).toHaveLength(2) // refreshToken and accessToken
    })
  })
})