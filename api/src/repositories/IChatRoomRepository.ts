import { ChatRoom } from 'src/models/chat-room'

export interface IChatRoomRepository {
  findAll(userId: string): Promise<ChatRoom[]>
  findByUsers(usersIds: string[]): Promise<ChatRoom | null>
  findByRoomId(roomId: string): Promise<ChatRoom | null>
  create(chatRooms: ChatRoom[]): Promise<void>
  save(chatRoom: ChatRoom): Promise<void>
  delete(roomId: string): Promise<void>
}
