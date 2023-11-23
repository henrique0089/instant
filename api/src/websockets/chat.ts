/* eslint-disable n/no-callback-literal */
import clerkClient from '@clerk/clerk-sdk-node'
import { CreateImageMessageService } from 'src/services/create-image-message-service'
import { CreateMessageService } from 'src/services/create-message-service'
import { FindAllMessagesService } from 'src/services/find-all-messages-service'
import { FindChatRoomByIdService } from 'src/services/find-chat-room-by-id-service'
import { io } from '../app'
import { MessageType } from '../models/message'

type ChatRoomData = {
  roomId: string
}

type CreateTextMessageData = {
  content: string
  senderId: string
  type: MessageType
  roomId: string
}

type CreateImageMessageData = {
  image: Buffer
  senderId: string
  roomId: string
}

io.on('connect', (socket) => {
  socket.on('start', async ({ roomId }: ChatRoomData, cb) => {
    const findAllMessagesService = new FindAllMessagesService()

    socket.join(roomId)

    const messages = await findAllMessagesService.execute(roomId)

    cb({ messages })
  })

  socket.on('text-message', async (data: CreateTextMessageData) => {
    const findChatRoomByIdService = new FindChatRoomByIdService()
    const createMessageService = new CreateMessageService()

    const room = await findChatRoomByIdService.execute(data.roomId)
    const recipientId = room.members.find(
      (mId) => mId !== data.senderId,
    ) as string

    const messageData = {
      content: data.content,
      senderId: data.senderId,
      recipientId,
      roomId: data.roomId,
      type: data.type,
      url: null,
    }

    const fullMessageData = await createMessageService.execute(messageData)
    const users = await clerkClient.users.getUserList()
    const senderAvatar = users.find((u) => u.id === data.senderId)?.imageUrl
    const recipientAvatar = users.find((u) => u.id === recipientId)?.imageUrl

    const fullMsg = {
      id: fullMessageData.id,
      content: fullMessageData.content,
      senderId: fullMessageData.senderId,
      senderAvatar,
      recipientId,
      recipientAvatar,
      roomId: fullMessageData.roomId,
      type: fullMessageData.type,
      url: fullMessageData.url,
    }

    io.to(data.roomId).emit('message', fullMsg)

    io.emit('notification', {
      roomId: data.roomId,
      senderId: data.senderId,
    })
  })

  socket.on('image-message', async (data: CreateImageMessageData) => {
    const createImageMessageService = new CreateImageMessageService()
    const findChatRoomByIdService = new FindChatRoomByIdService()

    const room = await findChatRoomByIdService.execute(data.roomId)
    const recipientId = room.members.find(
      (memberId) => memberId !== data.senderId,
    )

    const { message } = await createImageMessageService.execute({
      image: data.image,
      senderId: data.senderId,
      recipientId: recipientId as string,
      roomId: data.roomId,
    })

    io.to(data.roomId).emit('message', message)

    io.emit('notification', {
      roomId: data.roomId,
      senderId: data.senderId,
    })
  })
})
