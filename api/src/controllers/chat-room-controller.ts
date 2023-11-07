/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express'
import { z } from 'zod'
import { AppError } from '../app-error'
import { ChatRoom } from '../models/chat-room'
import { IChatRoomRepository } from '../repositories/IChatRoomRepository'

export class ChatRoomController {
  constructor(private chatRoomRepo: IChatRoomRepository) {}

  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      userIds: z.string().array().min(1),
    })

    const { userIds } = bodySchema.parse(req.body)
    const userLoggedInId = req.auth.userId

    for (const userId of userIds) {
      const roomAlreadyExists = await this.chatRoomRepo.findByUsers([
        userLoggedInId,
        userId,
      ])

      if (roomAlreadyExists) {
        throw new AppError('room already exists!')
      }
    }

    const chatRooms = userIds.map((userId) => {
      return new ChatRoom({
        members: [userLoggedInId, userId],
      })
    })

    await this.chatRoomRepo.create(chatRooms)
  }
}
