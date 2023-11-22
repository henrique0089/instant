import { AppError } from 'src/app-error'
import { PrismaChatRoomsRepository } from '../repositories/prisma-chat-rooms-repository'

interface Request {
  roomId: string
  socketId: string
}

export class UpdateChatRoomService {
  async execute({ roomId, socketId }: Request) {
    const chatRoomsRepo = new PrismaChatRoomsRepository()

    const room = await chatRoomsRepo.findByRoomId(roomId)

    if (!room) {
      throw new AppError('Chat room not found!')
    }

    room.socketId = socketId

    await chatRoomsRepo.save(room)
  }
}
