import { PrismaChatRoomsRepository } from 'src/repositories/prisma-chat-rooms-repository'

interface Response {
  id: string
  members: string[]
  socketId: string | null
}

export class FindChatRoomByIdService {
  async execute(roomId: string): Promise<Response> {
    const chatRoomsRepo = new PrismaChatRoomsRepository()

    const data = await chatRoomsRepo.findByRoomId(roomId)

    if (!data) {
      throw new Error('Chat Room Not Found!')
    }

    const room = {
      id: String(data.id),
      members: data.members,
      socketId: data.socketId,
    }

    return room
  }
}
