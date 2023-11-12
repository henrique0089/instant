import { Request, Response } from 'express'
import { AppError } from 'src/app-error'
import { z } from 'zod'
import { PrismaChatRoomsRepository } from '../../repositories/prisma-chat-rooms-repository'

export class PinChatRoomController {
  async handle(req: Request, res: Response): Promise<Response> {
    const paramsSchema = z.object({
      roomId: z.string(),
    })
    const chatRoomRepo = new PrismaChatRoomsRepository()

    const { roomId } = paramsSchema.parse(req.params)

    const chatRoom = await chatRoomRepo.findByRoomId(roomId)

    if (!chatRoom) {
      throw new AppError('Chat room not found!', 404)
    }

    const isAlreadyPinnedAccount = chatRoom.pinnedAt !== null

    if (isAlreadyPinnedAccount) {
      throw new AppError('This account has already been pinned!')
    }

    chatRoom.pinn()

    await chatRoomRepo.save(chatRoom)

    return res.status(204).send()
  }
}
