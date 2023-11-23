import { Request, Response } from 'express'
import { PrismaMessagesRepository } from 'src/repositories/prisma-message-repository'
import { z } from 'zod'

const querySchema = z.object({
  roomId: z.string(),
})

export class FindRoomImageMessagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { roomId } = querySchema.parse(req.query)
    const messagesRepo = new PrismaMessagesRepository()

    const images = await messagesRepo.findImagesByRoomId(roomId)

    return res.json(images)
  }
}
