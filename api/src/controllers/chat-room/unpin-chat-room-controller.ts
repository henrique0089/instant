import { Request, Response } from 'express'
import { AppError } from 'src/app-error'
import { z } from 'zod'
import { PrismaChatRoomsRepository } from '../../repositories/prisma-chat-rooms-repository'

export class UnpinChatRoomController {
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

    const isAlreadyUnpinnedAccount = chatRoom.pinnedAt === null

    if (isAlreadyUnpinnedAccount) {
      throw new AppError('This account has already been unpinned!')
    }

    chatRoom.unpinn()

    await chatRoomRepo.save(chatRoom)

    return res.status(204).send()
  }
}
