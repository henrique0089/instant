import { Message } from '../models/message'

export interface MessagesRepository {
  findAll(roomId: string): Promise<Message[]>
  create(data: Message): Promise<void>
}
