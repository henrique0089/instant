import { Request, Response } from 'express'
import { AppError } from 'src/app-error'
import { z } from 'zod'
import { ChatRoom } from '../../models/chat-room'
import { PrismaChatRoomsRepository } from '../../repositories/prisma-chat-rooms-repository'

export class CreateChatRoomController {
  async handle(req: Request, res: Response): Promise<Response> {
    const bodySchema = z.object({
      userIds: z.string().uuid().array().min(1),
    })
    const chatRoomsRepo = new PrismaChatRoomsRepository()

    const { userIds } = bodySchema.parse(req.body)
    const userLoggedInId = req.auth.userId

    const existingChatRooms: ChatRoom[] = []

    for (const userId of userIds) {
      const chatRoom = await chatRoomsRepo.findByUsers([userLoggedInId, userId])

      if (chatRoom) {
        existingChatRooms.push(chatRoom)
      }
    }

    if (existingChatRooms.length > 0) {
      throw new AppError(
        'There are already chat rooms with these users and you!',
      )
    }

    const chatRooms = userIds.map((userId) => {
      return new ChatRoom({
        members: [userLoggedInId, userId],
      })
    })

    await chatRoomsRepo.create(chatRooms)

    return res.json(existingChatRooms)
  }
}
