import { ChatRoom } from 'src/models/chat-room'

export interface IChatRoomRepository {
  findByUsers(usersIds: string[]): Promise<ChatRoom | null>
  create(chatRooms: ChatRoom[]): Promise<void>
}
