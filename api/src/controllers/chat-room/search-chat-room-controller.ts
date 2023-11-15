import clerkClient from '@clerk/clerk-sdk-node'
import { Request, Response } from 'express'
import { PrismaChatRoomsRepository } from 'src/repositories/prisma-chat-rooms-repository'
import { z } from 'zod'

export class SearchChatRoomByUsernameController {
  async handle(req: Request, res: Response): Promise<Response> {
    const userLoggedInId = req.auth.userId

    const querySchema = z.object({
      username: z.string(),
    })

    const { username } = querySchema.parse(req.query)
    const chatRoomRepo = new PrismaChatRoomsRepository()

    const clerkUsers = await clerkClient.users.getUserList()

    const user = clerkUsers.find((user) => user.firstName?.includes(username))

    if (!user) {
      return res.json([])
    }

    const chatRoomData = await chatRoomRepo.findByUsers([
      userLoggedInId,
      user.id,
    ])

    if (!chatRoomData) {
      return res.json([])
    }

    const chatRoom = {
      id: chatRoomData.id,
      member: {
        id: user.id,
        name: user.firstName,
        email: user.emailAddresses[0].emailAddress,
        avatar: user.imageUrl,
      },
    }

    return res.json([chatRoom])
  }
}
