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
  async execute({ content, senderId, url, type, recipientId, roomId }: Params) {
    const message = new Message({
      content,
      url,
      type,
      senderId,
      recipientId,
      roomId,
    })

    console.log(message)
  }
}
