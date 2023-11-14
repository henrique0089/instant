import { ChatRoom } from 'src/models/chat-room'
import { prisma } from '../config/prisma'
import {
  IPinnedChatRoomRepository,
  PinnedChatRoomParams,
} from './pinned-chat-room-repository'

export class PrismaPinnedChatRoomsRepository
  implements IPinnedChatRoomRepository
{
  async findAll(userId: string): Promise<ChatRoom[]> {
    const data = await prisma.pinnedChatRoom.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        chatRoom: true,
      },
    })

    const chatRooms = data.map((pinnedRoom) => {
      const { chatRoom } = pinnedRoom

      return new ChatRoom(
        { members: chatRoom.members, createdAt: chatRoom.createdAt },
        chatRoom.id,
      )
    })

    return chatRooms
  }

  async findById(roomId: string): Promise<ChatRoom | null> {
    const chatRoomData = await prisma.pinnedChatRoom.findFirst({
      where: {
        chatRoomId: roomId,
      },
      include: {
        chatRoom: true,
      },
    })

    if (!chatRoomData) {
      return null
    }

    const { chatRoom } = chatRoomData

    return new ChatRoom(
      { members: chatRoom.members, createdAt: chatRoom.createdAt },
      chatRoom.id,
    )
  }

  async findByUserId(userId: string): Promise<ChatRoom | null> {
    const chatRoomData = await prisma.pinnedChatRoom.findFirst({
      where: {
        ownerId: userId,
      },
      include: {
        chatRoom: true,
      },
    })

    if (!chatRoomData) {
      return null
    }

    const { chatRoom } = chatRoomData

    return new ChatRoom(
      { members: chatRoom.members, createdAt: chatRoom.createdAt },
      chatRoom.id,
    )
  }

  async create({ ownerId, roomId }: PinnedChatRoomParams): Promise<void> {
    await prisma.pinnedChatRoom.create({
      data: {
        ownerId,
        chatRoomId: roomId,
      },
    })
  }

  async delete(roomId: string): Promise<void> {
    await prisma.pinnedChatRoom.delete({
      where: {
        chatRoomId: roomId,
      },
    })
  }
}
