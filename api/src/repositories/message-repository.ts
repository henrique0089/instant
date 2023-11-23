import { Message } from '../models/message'

export interface MessagesRepository {
  findAll(roomId: string): Promise<Message[]>
  findImagesByRoomId(userId: string): Promise<string[]>
  create(data: Message): Promise<void>
}
