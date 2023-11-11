import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node'
import { Router } from 'express'
import { CreateChatRoomsController } from '../controllers/chat-room/create-chat-rooms-controller'
import { FindChatRoomsController } from '../controllers/chat-room/find-chat-rooms-controller'

const router = Router()

const findChatRoomsController = new FindChatRoomsController()
const createChatRoomsController = new CreateChatRoomsController()

router.get('/chats', ClerkExpressWithAuth(), findChatRoomsController.handle)
router.post('/chats', ClerkExpressWithAuth(), createChatRoomsController.handle)

export { router as routes }
