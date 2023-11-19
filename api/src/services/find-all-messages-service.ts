import { PrismaMessagesRepository } from 'src/repositories/prisma-message-repository'

interface Message {
  id: string
  content: string
  senderId: string
  recipientId: string
  createdAt: Date
}

export class FindAllMessagesService {
  async execute(roomId: string): Promise<Message[]> {
    const textMessagesRepo = new PrismaMessagesRepository()

    const data = await textMessagesRepo.findAll(roomId)

    const messages: Message[] = data.map((message) => {
      return {
        id: String(message.id),
        content: message.content,
        senderId: message.senderId,
        recipientId: message.recipientId,
        createdAt: message.createdAt,
      }
    })

    return messages
  }
}
