import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node'
import { Router } from 'express'
import { PinChatRoomController } from 'src/controllers/chat-room/pin-chat-room-controller'
import { UnpinChatRoomController } from 'src/controllers/chat-room/unpin-chat-room-controller'
import { CreateChatRoomsController } from '../controllers/chat-room/create-chat-rooms-controller'
import { DeleteChatRoomController } from '../controllers/chat-room/delete-chat-room-controller'
import { FindChatRoomsController } from '../controllers/chat-room/find-chat-rooms-controller'

const router = Router()

const findChatRoomsController = new FindChatRoomsController()
const createChatRoomsController = new CreateChatRoomsController()
const deleteChatRoomController = new DeleteChatRoomController()
const pinChatRoomController = new PinChatRoomController()
const unpinChatRoomController = new UnpinChatRoomController()

router.get('/chats', ClerkExpressWithAuth(), findChatRoomsController.handle)
router.post('/chats', ClerkExpressWithAuth(), createChatRoomsController.handle)
router.get(
  '/chats/pin/:roomId',
  ClerkExpressWithAuth(),
  pinChatRoomController.handle,
)
router.patch(
  '/chats/unpin/:roomId',
  ClerkExpressWithAuth(),
  unpinChatRoomController.handle,
)
router.delete(
  '/chats/delete/:roomId',
  ClerkExpressWithAuth(),
  deleteChatRoomController.handle,
)

export { router as routes }
