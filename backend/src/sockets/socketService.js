/* eslint-disable no-console */
import { Server } from 'socket.io'
import { createServer } from 'http'
import express from 'express'

import { corsOptions } from '~/config/cors'
import { JwtProvider } from '~/providers/JwtProvider'
import { env } from '~/config/environment'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: corsOptions
})

// Store room data
const roomData = {} // { 'date-courseID': [{userId, data}] }

io.use(async (socket, next) => {
  //console.log('A user is trying to connect:', socket.id)
  const { token } = socket.handshake.headers
  if (token) {
    try {
      const decoded = await JwtProvider.verifyToken(token, env.ACCESS_TOKEN_SECRET_SIGNATURE)
      if (!decoded._id) {
        return next(new Error('Invalid token'))
      }
      socket.handshake.query.userId = decoded._id
      //console.log('===> This user is verified and connected!!!')
    } catch (error) {
      return next(new Error(error))
    }
  }
  next()
})

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId

  // Handle joining room
  socket.on('joinRoom', ({ date, courseId }) => {
    const newRoomId = `${date}-${courseId}`

    // Leave previous rooms and clear user data
    Object.keys(roomData).forEach(roomId => {
      const userIndex = roomData[roomId].findIndex(user => user.userId === userId)
      if (userIndex !== -1) {
        // Remove user from old room
        roomData[roomId].splice(userIndex, 1)
        socket.leave(roomId)

        // Notify others in old room
        io.to(roomId).emit('roomData', roomData[roomId])
      }
    })

    // Initialize new room if not exists
    if (!roomData[newRoomId]) {
      roomData[newRoomId] = []
    }

    // Join new room
    socket.join(newRoomId)

    // Add user to new room with null data
    if (!roomData[newRoomId].find(user => user.userId === userId)) {
      roomData[newRoomId].push({
        userId: userId,
        data: null
      })
    }

    // Send current room data to the client
    socket.emit('roomData', roomData[newRoomId])
    // console.log(`User ${userId} joined room ${newRoomId}:`, roomData)
  })

  // Handle booking updates
  socket.on('updateBooking', ({ date, courseId, data }) => {
    const newRoomId = `${date}-${courseId}`
    // console.log('new data', data)
    // Find and leave current room
    Object.keys(roomData).forEach(roomId => {
      const userIndex = roomData[roomId].findIndex(user => user.userId === userId)
      if (userIndex !== -1) {
        // Remove user from old room
        roomData[roomId].splice(userIndex, 1)
        socket.leave(roomId)

        // Clean up empty room
        if (roomData[roomId].length === 0) {
          delete roomData[roomId]
        } else {
          // Notify others in old room
          io.to(roomId).emit('roomData', roomData[roomId])
        }
      }
    })

    // Initialize new room if it doesn't exist
    if (!roomData[newRoomId]) {
      roomData[newRoomId] = []
    }

    // Join new room
    socket.join(newRoomId)

    // Add user to new room with updated data
    roomData[newRoomId].push({
      userId: userId,
      data: data
    })

    // Broadcast updates to all users in the new room
    io.to(newRoomId).emit('roomData', roomData[newRoomId])
    // console.log(`User ${userId} switched to room ${newRoomId}:`, roomData)
  })

  socket.on('disconnect', () => {
    // Remove user from all rooms they were in
    Object.keys(roomData).forEach(roomId => {
      roomData[roomId] = roomData[roomId].filter(user => user.userId !== userId)

      // Clean up empty rooms
      if (roomData[roomId].length === 0) {
        delete roomData[roomId]
      } else {
        // Broadcast updated room data
        io.to(roomId).emit('roomData', roomData[roomId])
      }
    })

    console.log(`User ${userId} disconnected`)
  })
})

export { io, app, httpServer }