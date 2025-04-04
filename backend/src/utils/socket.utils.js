// This file exports utility functions for managing Socket.IO connections and events.

import { Server } from 'socket.io'

let io

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*', // Adjust this to your needs
      methods: ['GET', 'POST']
    }
  })
}

export const getSocket = () => {
  if (!io) {
    throw new Error('Socket not initialized. Call initSocket first.')
  }
  return io
}

export const emitBookingUpdate = (bookingData) => {
  if (!io) {
    throw new Error('Socket not initialized. Call initSocket first.')
  }
  io.emit('bookingUpdate', bookingData)
}