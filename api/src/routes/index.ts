import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node'
import { Router } from 'express'
import { CreateChatRoomController } from 'src/controllers/chat-room/create-chat-room-controller'
import { FindChatRoomsController } from '../controllers/chat-room/find-chat-rooms-controller'

const router = Router()

const findChatRoomsController = new FindChatRoomsController()
const createChatRoomController = new CreateChatRoomController()

router.get('/chats', ClerkExpressWithAuth(), findChatRoomsController.handle)
router.post('/chats', ClerkExpressWithAuth(), createChatRoomController.handle)

export { router as routes }
