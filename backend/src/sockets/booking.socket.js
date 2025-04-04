import logger from '../config/logger.config.js'

let io

/**
 * Initialize Socket.IO instance
 * @param {object} socketIo - Socket.IO instance
 */
const initializeSocket = (socketIo) => {
  io = socketIo

  io.on('connection', (socket) => {
    logger.info(`Client connected: ${socket.id}`)

    // Handle client joining admin room
    socket.on('join-admin', () => {
      socket.join('admin-room')
      logger.info(`${socket.id} joined admin-room`)
    })

    // Handle client joining user-specific room
    socket.on('join-user', (userId) => {
      socket.join(`user-${userId}`)
      logger.info(`${socket.id} joined user-${userId}`)
    })

    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`)
    })
  })

  logger.info('Socket.IO initialized')
  return io
}

/**
 * Emit booking created event to admin
 * @param {object} booking - Booking data
 */
const emitBookingCreated = (booking) => {
  if (!io) return

  io.to('admin-room').emit('booking-created', {
    id: booking.id,
    courseId: booking.courseId,
    courseName: booking.course?.name,
    date: booking.date,
    startTime: booking.startTime,
    endTime: booking.endTime,
    status: booking.status,
    createdAt: booking.createdAt
  })

  logger.debug(`Emitted booking-created event for booking ${booking.id}`)
}

/**
 * Emit booking status changed event
 * @param {object} booking - Updated booking
 */
const emitBookingStatusChanged = (booking) => {
  if (!io) return

  // Emit to admins
  io.to('admin-room').emit('booking-status-changed', {
    id: booking.id,
    status: booking.status,
    updatedAt: booking.updatedAt
  })

  // Emit to the booking owner
  io.to(`user-${booking.userId}`).emit('booking-status-changed', {
    id: booking.id,
    status: booking.status,
    updatedAt: booking.updatedAt
  })

  logger.debug(`Emitted booking-status-changed event for booking ${booking.id}`)
}

export {
  initializeSocket as default,
  emitBookingCreated,
  emitBookingStatusChanged
}