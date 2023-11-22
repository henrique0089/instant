import fs from 'fs'

import clerkClient from '@clerk/clerk-sdk-node'
import { randomBytes } from 'crypto'
import { resolve } from 'path'
import { AppError } from '../app-error'
import { Message } from '../models/message'
import { PrismaMessagesRepository } from '../repositories/prisma-message-repository'

interface Request {
  senderId: string
  recipientId: string
  roomId: string
  image: Buffer
}

interface Response {
  message: {
    id: string
    content: string | null
    senderId: string
    senderAvatar?: string
    recipientId: string
    recipientAvatar?: string
    roomId: string
    type: string
    url: string
  }
}

export class CreateImageMessageService {
  async execute({
    senderId,
    recipientId,
    roomId,
    image,
  }: Request): Promise<Response> {
    const messagesRepo = new PrismaMessagesRepository()

    const folder = resolve(__dirname, '..', 'uploads', 'images')
    const fileName = `${randomBytes(16).toString('hex')}-img.png`
    const imageUrl = `/${folder}/${fileName}`

    fs.writeFile(imageUrl, image, (err) => {
      if (err) {
        throw new AppError(err.message, Number(err.code))
      }
    })

    const messageData = new Message({
      content: null,
      senderId,
      recipientId,
      roomId,
      type: 'IMAGE',
      url: imageUrl,
    })

    await messagesRepo.create(messageData)

    const users = await clerkClient.users.getUserList()
    const senderAvatar = users.find((u) => u.id === senderId)?.imageUrl
    const recipientAvatar = users.find((u) => u.id === recipientId)?.imageUrl

    const fullMsg = {
      id: messageData.id as string,
      content: messageData.content,
      senderId: messageData.senderId,
      senderAvatar,
      recipientId,
      recipientAvatar,
      roomId: messageData.roomId,
      type: messageData.type,
      url: messageData.url as string,
    }

    return { message: fullMsg }
  }
}
