import { randomBytes } from 'crypto'
import fs from 'fs'
import { resolve } from 'path'

import clerkClient from '@clerk/clerk-sdk-node'
import sizeOf from 'image-size'
import { generateImageUrl } from 'src/utils/generate-image-url'
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

    const dimensions = sizeOf(image)
    const fileExt =
      dimensions.type === 'image/jpeg' || dimensions.type === 'image/jpg'
        ? 'jpg'
        : 'png'

    const folder = resolve(__dirname, '..', 'uploads', 'images')
    const fileName = `${randomBytes(16).toString('hex')}-img.${fileExt}`
    const imageUrl = generateImageUrl(fileName)

    fs.writeFile(`/${folder}/${fileName}`, image, (err) => {
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
