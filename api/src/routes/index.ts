import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node'
import { Router } from 'express'
import { ChatRoomController } from 'src/controllers/chat-room-controller'
import { MongoChatRoomRepository } from 'src/repositories/mongo-chat-room-repository'

const router = Router()

const chatRoomRepo = new MongoChatRoomRepository()
const chatRoomController = new ChatRoomController(chatRoomRepo)

router.post('/chats', ClerkExpressWithAuth(), chatRoomController.create)

export { router as routes }
