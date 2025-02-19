/* eslint-disable no-console */
// src/sockets/socketService.js
const connectSocket = (socket) => {
  console.log('New client connected: ' + socket.id)

  // Gửi ID về cho client
  socket.emit('getId', socket.id)

  // Lắng nghe sự kiện từ client
  socket.on('sendDataClient', function (data) {
    console.log(data)
    global._io.emit('sendDataServer', { data })
  })

  // Xử lý khi client ngắt kết nối
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
}

export const socketService = {
  connectSocket
}