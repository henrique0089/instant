import { Request, Response } from 'express'
import { PrismaChatRoomsRepository } from '../../repositories/prisma-chat-rooms-repository'

export class FindChatRoomsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const chatRoomRepo = new PrismaChatRoomsRepository()
    const chatRooms = await chatRoomRepo.findAll()

    return res.json(chatRooms)
  }
}
