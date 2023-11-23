import clerkClient from '@clerk/clerk-sdk-node'
import { PrismaMessagesRepository } from 'src/repositories/prisma-message-repository'

interface Message {
  id: string
  content: string | null
  type: 'TEXT' | 'IMAGE' | 'AUDIO'
  url: string | null
  roomId: string
  senderId: string
  senderAvatar: string
  recipientId: string
  recipientAvatar: string
  createdAt: Date
}

export class FindAllMessagesService {
  async execute(roomId: string): Promise<Message[]> {
    const messagesRepo = new PrismaMessagesRepository()
    const users = await clerkClient.users.getUserList()

    const data = await messagesRepo.findAll(roomId)

    const messages: Message[] = data.map((message) => {
      const senderAvatar = users.find((user) => user.id === message.senderId)
        ?.imageUrl as string

      const recipientAvatar = users.find(
        (user) => user.id === message.recipientId,
      )?.imageUrl as string

      return {
        id: String(message.id),
        content: message.content,
        type: message.type,
        url: message.url,
        roomId: message.roomId,
        senderId: message.senderId,
        senderAvatar,
        recipientId: message.recipientId,
        recipientAvatar,
        createdAt: message.createdAt,
      }
    })

    return messages
  }
}
