/* eslint-disable n/no-callback-literal */
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

  socket.on('message', async (data: CreateChatRoomData, cb) => {
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

    await createMessageService.execute(messageData)

    cb({ messageData })
  })
})
