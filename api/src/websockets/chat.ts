/* eslint-disable n/no-callback-literal */
import clerkClient from '@clerk/clerk-sdk-node'
import { CreateMessageService } from 'src/services/create-message-service'
import { FindAllMessagesService } from 'src/services/find-all-messages-service'
import { FindChatRoomByIdService } from 'src/services/find-chat-room-by-id-service'
import { io } from '../app'
import { MessageType } from '../models/message'

type ChatRoomData = {
  roomId: string
}

type CreateChatRoomData = {
  content: string
  senderId: string
  type: MessageType
  roomId: string
}

io.on('connect', (socket) => {
  socket.on('start', async ({ roomId }: ChatRoomData, cb) => {
    socket.join(roomId)

    const findAllMessagesService = new FindAllMessagesService()
    const messages = await findAllMessagesService.execute(roomId)

    cb({ messages })
  })

  socket.on('text-message', async (data: CreateChatRoomData) => {
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

    io.to(data.roomId).emit('recieved-text-message', fullMsg)
  })
})
