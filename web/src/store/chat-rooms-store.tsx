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
}

interface ChatRoomStore {
  allChatRooms: ChatRoom[]
  pinnedChatRooms: ChatRoom[]
  initChatRooms: (allChatRooms: ChatRoom[], pinnedChatRooms: ChatRoom[]) => void
  add: (room: ChatRoom) => void
  pin: (room: ChatRoom) => void
  unpin: (roomId: string) => void
  remove: (roomId: string, pinned: boolean) => void
}

export const useChatRoomsStore = create<ChatRoomStore>((set, get) => ({
  allChatRooms: [],
  pinnedChatRooms: [],
  initChatRooms: (allChatRooms: ChatRoom[], pinnedChatRooms: ChatRoom[]) => {
    set(() => ({ allChatRooms, pinnedChatRooms }))
  },
  add: (room: ChatRoom) => {
    set((state) => ({ allChatRooms: [...state.allChatRooms, room] }))
  },
  pin: (room: ChatRoom) => {
    set((state) => ({ pinnedChatRooms: [...state.pinnedChatRooms, room] }))
  },
  unpin: (roomId: string) => {
    const { pinnedChatRooms } = get()

    const filteredPinnedChatRooms = pinnedChatRooms.filter(
      (room) => room.id !== roomId,
    )

    set(() => ({ pinnedChatRooms: filteredPinnedChatRooms }))
  },
  remove: (roomId: string, pinned: boolean) => {
    const { pinnedChatRooms, allChatRooms } = get()

    if (pinned) {
      const filteredPinnedChatRooms = pinnedChatRooms.filter(
        (room) => room.id !== roomId,
      )

      const filteredChatRooms = allChatRooms.filter(
        (room) => room.id !== roomId,
      )

      set(() => ({
        pinnedChatRooms: filteredPinnedChatRooms,
        allChatRooms: filteredChatRooms,
      }))
    } else {
      const filteredChatRooms = allChatRooms.filter(
        (room) => room.id !== roomId,
      )

      set(() => ({ allChatRooms: filteredChatRooms }))
    }
  },
}))
