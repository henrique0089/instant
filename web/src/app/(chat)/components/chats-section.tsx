'use client'

import { MessageCircle, Pin } from 'lucide-react'
import { Separator } from '../../../components/ui/separator'
import { ChatsList } from './chats-list'
import { ChatRoomsResponse } from './inbox'

type ChatsSectionProps = ChatRoomsResponse

export function ChatsSection({
  allChatRooms,
  pinnedChatRooms,
}: ChatsSectionProps) {
  return (
    <div className="mt-4">
      {pinnedChatRooms.length > 0 && (
        <div>
          <h3 className="px-4 text-zinc-400 text-sm font-medium flex items-center gap-2">
            <Pin className="h-5 w-5 stroke-zinc-400" /> Pinned
          </h3>

          <ChatsList type="pinned" chats={pinnedChatRooms} />
        </div>
      )}

      {allChatRooms.length > 0 && pinnedChatRooms.length > 0 && (
        <div className="px-4 my-6">
          <Separator className="bg-zinc-700" />
        </div>
      )}

      {allChatRooms.length > 0 && (
        <div>
          <h3 className="px-4 text-zinc-400 text-sm font-medium flex items-center gap-2">
            <MessageCircle className="h-5 w-5 stroke-zinc-400" /> All Chats
          </h3>

          <ChatsList type="all" chats={allChatRooms} />
        </div>
      )}
    </div>
  )
}
