import { io } from '../app'

type ChatRoomData = {
  roomId: string
}

io.on('connect', (socket) => {
  socket.on('start', ({ roomId }: ChatRoomData) => {
    const token = socket.handshake.auth.token

    if (!token) {
      console.log('Token is required!')
      return
    }

    console.log('Room ID', roomId)
  })
})
