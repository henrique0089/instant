'use client'

import { api } from '@/lib/axios'
import { useChatRoomsStore } from '@/store/chat-rooms-store'
import { useAuth } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Avatar } from '../avatar'
import { Gallery } from './gallery'

export function Content() {
  const params = useParams()
  const { getToken } = useAuth()
  const [images, setImages] = useState<string[]>([])

  const roomId = params.id
  const allChatRooms = useChatRoomsStore((state) => state.allChatRooms)
  const currentChatRoom = allChatRooms.find((room) => room.id === roomId)
  const member = currentChatRoom?.member

  useEffect(() => {
    async function getRoomImages() {
      const token = await getToken()

      const res = await api.get<string[]>('/chats/images', {
        params: {
          roomId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setImages(res.data)
    }

    if (roomId) {
      getRoomImages()
    }
  }, [getToken, roomId])

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
        <h3 className="text-zinc-500 text-sm">Media ({images.length})</h3>

        {roomId && <Gallery images={images} />}
      </div>
    </div>
  )
}
