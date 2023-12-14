import { io } from 'socket.io-client'

export function socketInstance(userId?: string) {
  return io(
    'https://3333-henrique0089-instant-3bo4m70o84j.ws-us107.gitpod.io',
    {
      auth: {
        userId,
      },
    },
  )
}
