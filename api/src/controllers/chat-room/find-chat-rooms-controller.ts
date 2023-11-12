import clerkClient from '@clerk/clerk-sdk-node'
import { Request, Response } from 'express'
import { PrismaPinnedChatRoomsRepository } from 'src/repositories/prisma-pinned-chat-room-repository'
import { PrismaChatRoomsRepository } from '../../repositories/prisma-chat-rooms-repository'

export class FindChatRoomsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const userLoggedInId = req.auth.userId

    const chatRoomsRepo = new PrismaChatRoomsRepository()
    const pinnedChatRoomRepo = new PrismaPinnedChatRoomsRepository()
    const chatRoomsData = await chatRoomsRepo.findAll()
    const pinnedChatRoomsData = await pinnedChatRoomRepo.findAll()

    const clerkUsers = await clerkClient.users.getUserList()

    const allChatRooms = chatRoomsData.map((r) => {
      const member = r.members
        .map((memberId) => {
          const user = clerkUsers.find((u) => u.id === memberId)

          return {
            id: user?.id,
            name: user?.firstName,
            email: user?.emailAddresses[0].emailAddress,
            avatar: user?.imageUrl,
          }
        })
        .find((m) => m.id !== userLoggedInId)

      return {
        id: r.id,
        member,
      }
    })

    const pinnedChatRooms = pinnedChatRoomsData.map((r) => {
      const member = r.members
        .map((memberId) => {
          const user = clerkUsers.find((u) => u.id === memberId)

          return {
            id: user?.id,
            name: user?.firstName,
            email: user?.emailAddresses[0].emailAddress,
            avatar: user?.imageUrl,
          }
        })
        .find((m) => m.id !== userLoggedInId)

      return {
        id: r.id,
        member,
      }
    })

    return res.json({ allChatRooms, pinnedChatRooms })
  }
}
