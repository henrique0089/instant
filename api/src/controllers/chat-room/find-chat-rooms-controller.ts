import clerkClient from '@clerk/clerk-sdk-node'
import { Request, Response } from 'express'
import { PrismaChatRoomsRepository } from '../../repositories/prisma-chat-rooms-repository'

export class FindChatRoomsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const userLoggedInId = req.auth.userId

    const chatRoomRepo = new PrismaChatRoomsRepository()
    const chatRooms = await chatRoomRepo.findAll()

    const clerkUsers = await clerkClient.users.getUserList()

    const allChatRooms = chatRooms
      .filter((room) => room.pinnedAt === null)
      .map((r) => {
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

    const pinnedChatRooms = chatRooms
      .filter((room) => room.pinnedAt !== null)
      .map((r) => {
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
          pinnedAt: r.pinnedAt,
        }
      })

    return res.json({ allChatRooms, pinnedChatRooms })
  }
}
