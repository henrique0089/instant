import { create } from 'zustand'

export type MessageData = {
  id: string
  content: string | null
  type: 'TEXT' | 'IMAGE' | 'AUDIO'
  url: string | null
  roomId: string
  senderId: string
  senderAvatar: string
  recipientId: string
  recipientAvatar: string
  createdAt: Date
}

interface MessagesStore {
  messages: MessageData[]
  setMessages: (messages: MessageData[]) => void
  addMessage: (message: MessageData) => void
}

export const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],
  setMessages: (messages: MessageData[]) => {
    set(() => ({ messages }))
  },
  addMessage: (message: MessageData) => {
    set((state) => ({ messages: [...state.messages, message] }))
  },
}))
