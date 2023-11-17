'use client'

import { useChatRoomsStore } from '@/store/chat-rooms-store'
import { useParams } from 'next/navigation'
import { Avatar } from '../avatar'
import { Gallery } from './gallery'

export function Content() {
  const params = useParams()
  const roomId = params.id
  const allChatRooms = useChatRoomsStore((state) => state.allChatRooms)
  const currentChatRoom = allChatRooms.find((room) => room.id === roomId)
  const member = currentChatRoom?.member

  return (
    <div className="px-5">
      <div className="flex flex-col items-center">
        <Avatar
          src={member?.avatar}
          alt={`${member?.name}'s avatar`}
          variant="dark"
          size="lg"
        />

        <h2 className="mt-3 text-zinc-200 text-2xl font-medium">
          {member?.name}
        </h2>

        <span className="text-zinc-400 text-sm">{member?.email}</span>
      </div>

      <div className="mt-6">
        <h3 className="text-zinc-500 text-sm">Media (23)</h3>

        <Gallery />
      </div>
    </div>
  )
}
