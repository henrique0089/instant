'use client'

import { useChatRoomsStore } from '@/store/chat-rooms-store'

export function ChatsCounter() {
  const chatRooms = useChatRoomsStore((state) => state.allChatRooms)

  return (
    <span className="block text-xs text-zinc-200 font-semibold">
      <strong className="text-base">{chatRooms.length}</strong> chats
    </span>
  )
}
