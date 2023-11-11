import { create } from 'zustand'

export interface ChatRoom {
  id: string
  member: {
    name: string
    email: string
    avatar: string
  }
  pinnedAt: Date
}

interface ChatRoomStore {
  chatRooms: ChatRoom[]
  add: (room: ChatRoom) => void
}

export const useChatRoomsStore = create<ChatRoomStore>((set) => ({
  chatRooms: [],
  add: (room: ChatRoom) => {
    set((state) => ({ chatRooms: [...state.chatRooms, room] }))
  },
}))
