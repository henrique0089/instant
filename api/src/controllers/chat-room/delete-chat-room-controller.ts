import { Request, Response } from 'express'
import { PrismaChatRoomsRepository } from 'src/repositories/prisma-chat-rooms-repository'
import { z } from 'zod'
import { AppError } from '../../app-error'

export class DeleteChatRoomController {
  async handle(req: Request, res: Response): Promise<Response> {
    const paramsSchema = z.object({
      roomId: z.string(),
    })
    const chatRoomRepo = new PrismaChatRoomsRepository()

    const userLoggedInId = req.auth.userId
    const { roomId } = paramsSchema.parse(req.params)

    const chatRoom = await chatRoomRepo.findByRoomId(roomId)

    if (!chatRoom) {
      throw new AppError('Chat room not found!', 404)
    }

    const isUserMember = chatRoom.members.some(
      (memberId) => memberId === userLoggedInId,
    )

    if (!isUserMember) {
      throw new AppError('Unauthorized action!')
    }

    await chatRoomRepo.delete(String(chatRoom.id))

    return res.status(204).send()
  }
}
