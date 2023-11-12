import { ChatRoom } from '../models/chat-room'

export interface PinnedChatRoomParams {
  ownerId: string
  roomId: string
}

export interface IPinnedChatRoomRepository {
  findAll(): Promise<ChatRoom[]>
  findById(roomId: string): Promise<ChatRoom | null>
  create(data: PinnedChatRoomParams): Promise<void>
}
