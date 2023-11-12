import { Request, Response } from 'express'
import { AppError } from 'src/app-error'
import { PrismaPinnedChatRoomsRepository } from 'src/repositories/prisma-pinned-chat-room-repository'
import { z } from 'zod'
import { PrismaChatRoomsRepository } from '../../repositories/prisma-chat-rooms-repository'

export class PinChatRoomController {
  async handle(req: Request, res: Response): Promise<Response> {
    const userLoggedInId = req.auth.userId

    const paramsSchema = z.object({
      roomId: z.string(),
    })
    const chatRoomsRepo = new PrismaChatRoomsRepository()
    const pinnedChatRoomsRepo = new PrismaPinnedChatRoomsRepository()

    const { roomId } = paramsSchema.parse(req.params)

    const chatRoom = await chatRoomsRepo.findByRoomId(roomId)

    if (!chatRoom) {
      throw new AppError('Chat room not found!', 404)
    }

    const isAlreadyPinnedAccount = await pinnedChatRoomsRepo.findById(roomId)

    if (isAlreadyPinnedAccount) {
      throw new AppError('This account has already been pinned!')
    }

    await pinnedChatRoomsRepo.create({
      ownerId: userLoggedInId,
      roomId: String(chatRoom.id),
    })

    return res.status(204).send()
  }
}
