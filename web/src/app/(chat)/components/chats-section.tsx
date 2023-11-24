'use client'

import { api } from '@/lib/axios'
import { ChatRoom, useChatRoomsStore } from '@/store/chat-rooms-store'
import { useAuth } from '@clerk/nextjs'
import { MessageCircle, Pin } from 'lucide-react'
import { useEffect } from 'react'
import { Separator } from '../../../components/ui/separator'
import { ChatsList } from './chats-list'

interface ChatRoomsResponse {
  allChatRooms: ChatRoom[]
  pinnedChatRooms: ChatRoom[]
}

export function ChatsSection() {
  const { getToken } = useAuth()
  const [allChatRooms, pinnedChatRooms, initChatRooms] = useChatRoomsStore(
    (state) => [state.allChatRooms, state.pinnedChatRooms, state.initChatRooms],
  )

  useEffect(() => {
    async function loadChatRooms() {
      const token = await getToken()

      const { data } = await api.get<ChatRoomsResponse>('/chats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      initChatRooms(data.allChatRooms, data.pinnedChatRooms)
    }

    loadChatRooms()
  }, [getToken, initChatRooms])

  return (
    <div className="mt-6 lg:mt-4">
      {pinnedChatRooms?.length > 0 && (
        <div>
          <h3 className="px-4 text-zinc-400 text-sm font-medium flex items-center gap-2">
            <Pin className="h-5 w-5 stroke-zinc-400" /> Pinned
          </h3>

          <ChatsList type="pinned" chats={pinnedChatRooms} />
        </div>
      )}

      {allChatRooms?.length > 0 && pinnedChatRooms.length > 0 && (
        <div className="px-4 my-6">
          <Separator className="bg-zinc-700" />
        </div>
      )}

      {allChatRooms?.length > 0 && (
        <div>
          <h3 className="px-4 text-zinc-400 text-sm font-medium flex items-center gap-2">
            <MessageCircle className="h-5 w-5 stroke-zinc-400" /> All Chats
          </h3>

          <ChatsList type="all" chats={allChatRooms} />
        </div>
      )}

      {allChatRooms?.length === 0 && pinnedChatRooms.length === 0 && (
        <div className="mt-6 w-full flex flex-col justify-center items-center gap-2">
          <MessageCircle className="h-10 w-10 stroke-zinc-600" />

          <span className="text-zinc-600 text-lg">No chats yet</span>
        </div>
      )}
    </div>
  )
}
