import { prisma } from '../config/prisma'
import { Message } from '../models/message'
import { MessagesRepository } from './message-repository'

export class PrismaMessagesRepository implements MessagesRepository {
  async findAll(roomId: string): Promise<Message[]> {
    const data = await prisma.message.findMany({
      where: {
        roomId,
      },
    })

    const messages = data.map((message) => {
      return new Message(
        {
          content: message.content,
          type: message.type,
          url: message.url,
          senderId: message.senderId,
          recipientId: message.recipientId,
          roomId: message.roomId,
          createdAt: message.createdAt,
        },
        message.id,
      )
    })

    return messages
  }

  async findImagesByRoomId(roomId: string): Promise<string[]> {
    const messages = await prisma.message.findMany({
      where: {
        roomId,
      },
      take: 9,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const images = messages
      .map((m) => m.url as string)
      .filter((image) => image !== null)

    return images
  }

  async create(data: Message): Promise<void> {
    await prisma.message.create({
      data: {
        id: data.id,
        content: data.content,
        type: data.type,
        url: data.url,
        senderId: data.senderId,
        recipientId: data.recipientId,
        roomId: data.roomId,
        createdAt: data.createdAt,
      },
    })
  }
}
