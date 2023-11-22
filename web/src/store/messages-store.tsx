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

export type NotificationData = {
  roomId: string
  senderId: string
}

interface MessagesStore {
  messages: MessageData[]
  notifications: NotificationData[]
  setMessages: (messages: MessageData[]) => void
  addMessage: (message: MessageData) => void
  addNotification: (notification: NotificationData) => void
  removeNotification: (roomId: string) => void
}

export const useMessagesStore = create<MessagesStore>((set, get) => ({
  messages: [],
  notifications: [],
  setMessages: (messages: MessageData[]) => {
    set(() => ({ messages }))
  },
  addMessage: (message: MessageData) => {
    set((state) => ({ messages: [...state.messages, message] }))
  },
  addNotification: (notification: NotificationData) => {
    set((state) => ({ notifications: [...state.notifications, notification] }))
  },
  removeNotification: (roomId: string) => {
    const { notifications } = get()

    const updatedNotifications = notifications.filter(
      (n) => n.roomId !== roomId,
    )

    set(() => ({ notifications: updatedNotifications }))
  },
}))
