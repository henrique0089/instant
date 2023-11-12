import { ChatRoom } from 'src/models/chat-room'
import { prisma } from '../config/prisma'
import { IChatRoomRepository } from './IChatRoomRepository'

export class PrismaChatRoomsRepository implements IChatRoomRepository {
  async findAll(): Promise<ChatRoom[]> {
    const data = await prisma.chatRoom.findMany()

    const chatRooms = data.map((chat) => {
      return new ChatRoom(
        {
          members: chat.members,
          pinnedAt: chat.pinnedAt,
          createdAt: chat.createdAt,
        },
        chat.id,
      )
    })

    return chatRooms
  }

  async findByUsers(usersIds: string[]): Promise<ChatRoom | null> {
    const data = await prisma.chatRoom.findFirst({
      where: {
        members: { hasEvery: usersIds },
      },
    })

    if (!data) {
      return null
    }

    const chatRoom = new ChatRoom(
      {
        members: data.members,
        pinnedAt: data.pinnedAt,
        createdAt: data.createdAt,
      },
      data.id,
    )

    return chatRoom
  }

  async findByRoomId(roomId: string): Promise<ChatRoom | null> {
    const room = await prisma.chatRoom.findUnique({
      where: {
        id: roomId,
      },
    })

    if (!room) {
      return null
    }

    const chatRoom = new ChatRoom(
      {
        members: room.members,
        pinnedAt: room.pinnedAt,
        createdAt: room.createdAt,
      },
      room.id,
    )

    return chatRoom
  }

  async create(chatRooms: ChatRoom[]): Promise<void> {
    const data = chatRooms.map((chat) => {
      return {
        id: chat.id,
        members: chat.members,
        pinnedAt: chat.pinnedAt,
        createdAt: chat.createdAt,
      }
    })

    await prisma.chatRoom.createMany({
      data,
    })
  }

  async delete(roomId: string): Promise<void> {
    await prisma.chatRoom.delete({
      where: {
        id: roomId,
      },
    })
  }
}
