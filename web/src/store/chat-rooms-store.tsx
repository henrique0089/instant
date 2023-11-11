import { create } from 'zustand'

export type Member = {
  id: string
  name: string
  email: string
  avatar: string
}

export interface ChatRoom {
  id: string
  member: Member
  pinnedAt: Date
}

export interface DefaultChatRoom {
  id: string
  member: Member
}

interface ChatRoomStore {
  chatRooms: DefaultChatRoom[]
  add: (room: ChatRoom) => void
}

export const useChatRoomsStore = create<ChatRoomStore>((set) => ({
  chatRooms: [],
  add: (room: ChatRoom) => {
    set((state) => ({ chatRooms: [...state.chatRooms, room] }))
  },
}))
