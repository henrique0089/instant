import { PrismaMessagesRepository } from 'src/repositories/prisma-message-repository'
import { Message, MessageType } from '../models/message'

interface Params {
  content: string
  senderId: string
  url: string | null
  type: MessageType
  recipientId: string
  roomId: string
}

export class CreateMessageService {
  async execute({
    content,
    senderId,
    url,
    type,
    recipientId,
    roomId,
  }: Params): Promise<Message> {
    const messagesRepo = new PrismaMessagesRepository()

    const message = new Message({
      content,
      url,
      type,
      senderId,
      recipientId,
      roomId,
    })

    await messagesRepo.create(message)

    return message
  }
}
