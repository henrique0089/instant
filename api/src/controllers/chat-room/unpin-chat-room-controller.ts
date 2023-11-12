import { Request, Response } from 'express'
import { AppError } from 'src/app-error'
import { PrismaPinnedChatRoomsRepository } from 'src/repositories/prisma-pinned-chat-room-repository'
import { z } from 'zod'
import { PrismaChatRoomsRepository } from '../../repositories/prisma-chat-rooms-repository'

export class UnpinChatRoomController {
  async handle(req: Request, res: Response): Promise<Response> {
    const loggedUserId = req.auth.userId

    const paramsSchema = z.object({
      roomId: z.string(),
    })
    const chatRoomRepo = new PrismaChatRoomsRepository()
    const pinnedChatRoomRepo = new PrismaPinnedChatRoomsRepository()

    const { roomId } = paramsSchema.parse(req.params)

    const chatRoom = await chatRoomRepo.findByRoomId(roomId)

    if (!chatRoom) {
      throw new AppError('Chat room not found!', 404)
    }

    const pinnedAccount = await pinnedChatRoomRepo.findById(roomId)

    if (!pinnedAccount) {
      throw new AppError('This account has not been pinned!')
    }

    const isMemberOwner = await pinnedChatRoomRepo.findByUserId(loggedUserId)

    if (!isMemberOwner) {
      throw new AppError('Unauthorized action!')
    }

    await pinnedChatRoomRepo.delete(roomId)

    return res.status(204).send()
  }
}
