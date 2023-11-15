'use client'

import { api } from '@/lib/axios'
import { ChatRoom, useChatRoomsStore } from '@/store/chat-rooms-store'
import { useAuth } from '@clerk/nextjs'
import { RotateCcw } from 'lucide-react'

interface ChatRoomsResponse {
  allChatRooms: ChatRoom[]
  pinnedChatRooms: ChatRoom[]
}

export function RestoreChatRoomsButton() {
  const { getToken } = useAuth()
  const initChatRooms = useChatRoomsStore((state) => state.initChatRooms)

  async function findAllChatRooms() {
    const token = await getToken()

    const { data } = await api.get<ChatRoomsResponse>('/chats', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    initChatRooms(data.allChatRooms, data.pinnedChatRooms)
  }

  return (
    <button onClick={findAllChatRooms} className="mt-3 group">
      <RotateCcw className="h-5 w-5 stroke-zinc-500 group-hover:stroke-zinc-400" />
    </button>
  )
}
