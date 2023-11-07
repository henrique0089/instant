import { Db, ObjectId } from 'mongodb'
import { mongodb } from '../config/mongodb'
import { ChatRoom } from '../models/chat-room'
import { IChatRoomRepository } from './IChatRoomRepository'

export class MongoChatRoomRepository implements IChatRoomRepository {
  private db: Db

  constructor() {
    this.db = mongodb.db('instant')
  }

  async findByUsers(usersIds: string[]): Promise<ChatRoom | null> {
    const collection = this.db.collection('chats')
    const ids = usersIds.map((userId) => new ObjectId(userId))

    const doc = await collection.findOne({
      members: {
        $all: ids,
      },
    })

    if (!doc) return null

    const chatRoom = new ChatRoom(
      {
        members: doc.members,
        pinnedAt: doc.pinnedAt,
        createdAt: doc.createdAt,
      },
      doc._id.toString(),
    )

    return chatRoom
  }

  async create(chatRooms: ChatRoom[]): Promise<void> {
    const collection = this.db.collection('chats')

    const chats = chatRooms.map((chat) => {
      return {
        id: new ObjectId(chat.id),
        members: chat.members,
        pinnedAt: chat.pinnedAt,
        createdAt: chat.createdAt,
      }
    })

    await collection.insertMany(chats)
  }
}
