/* eslint-disable no-console */
// src/sockets/socketService.js
import { corsOptions } from '~/config/cors'
import { Server } from 'socket.io'
import { createServer } from 'http'
import express from 'express'
const app = express()
// Create HTTP server
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: corsOptions
})

export function getReceiverSocketId(userId) {
  return userSocketMap[userId]
}
// used to store online users
const userSocketMap = {} // {userId: socketId}

io.on('connection', (socket) => {
  console.log('A user connected ', socket.id)

  const userId = socket.handshake.query.userId
  if (userId) userSocketMap[userId] = socket.id

  // Gửi ID về cho client
  socket.emit('getId', socket.id)

  // Lắng nghe sự kiện từ client
  socket.on('sendDataClient', function (data) {
    console.log(data)
    io.emit('sendDataServer', { data })
  })

  // Xử lý khi client ngắt kết nối
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

export { io, app, httpServer }