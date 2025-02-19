/* eslint-disable no-console */
import { Server } from 'socket.io'
import { createServer } from 'http'
import express from 'express'

import { corsOptions } from '~/config/cors'
import { JwtProvider } from '~/providers/JwtProvider'
import { env } from '~/config/environment'

const app = express()
// Create HTTP server
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: corsOptions
})

// Store both socket IDs and user data
const userSocketMap = {} // {userId: socketId}
const userDataMap = [] // [{userId: string, data: any}]

export function getReceiverSocketId(userId) {
  return userSocketMap[userId]
}

export function getUserData() {
  return userDataMap
}

io.use((socket, next) => {
  console.log('A user is trying to connect:', socket.id)
  const { token } = socket.handshake.headers
  if (token) {
    try {
      const decoded = JwtProvider.verifyToken(token, env.ACCESS_TOKEN_SECRET_SIGNATURE)
      socket.handshake.query.userId = decoded._id
      console.log('===> This user is verified and connected!!!')
    } catch (error) {
      return next(new Error(error))
    }
  }
  next()
})

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId
  if (userId) {
    userSocketMap[userId] = socket.id
    // Add new user to userDataMap if not exists
    if (!userDataMap.find(user => user.userId === userId)) {
      userDataMap.push({
        userId: userId,
        data: null
      })
    }
    console.log('Current User:', userSocketMap)
    // Send current data state to all clients
    io.emit('sendDataServer', userDataMap)
  }

  socket.emit('getId', socket.id)

  // Listen for data updates from clients
  socket.on('sendDataClient', function (data) {
    const userId = socket.handshake.query.userId
    console.log('Data received from client:', data)
    console.log('userDataMap', userDataMap)
    if (!userId) return

    // Update data for specific user
    const userIndex = userDataMap.findIndex(user => user.userId === userId)
    if (userIndex !== -1) {
      userDataMap[userIndex].data = data
    } else {
      userDataMap.push({
        userId: userId,
        data: data
      })
    }

    // Broadcast updated data to all clients
    io.emit('sendDataServer', userDataMap)
  })

  socket.on('disconnect', () => {
    const userId = socket.handshake.query.userId
    if (userId) {
      delete userSocketMap[userId]
      // Optionally remove user data when they disconnect
      // const userIndex = userDataMap.findIndex(user => user.userId === userId)
      // if (userIndex !== -1) {
      //   userDataMap.splice(userIndex, 1)
      //   io.emit('sendDataServer', userDataMap)
      // }
    }
    console.log('Client disconnected')
  })
})

export { io, app, httpServer }