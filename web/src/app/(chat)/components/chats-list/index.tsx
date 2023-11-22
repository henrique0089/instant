'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { socketInstance } from '@/lib/socket.io-client'
import { ChatRoom } from '@/store/chat-rooms-store'
import { NotificationData, useMessagesStore } from '@/store/messages-store'
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Chat } from './chat'

interface ChatsListProps {
  type: 'pinned' | 'all'
  chats: ChatRoom[]
}

export function ChatsList({ type, chats }: ChatsListProps) {
  const { user } = useUser()
  const [socket] = useState(socketInstance(user?.id))
  const params = useParams()
  const roomId = params.id

  const addNotification = useMessagesStore((state) => state.addNotification)

  useEffect(() => {
    socket.on('notification', (notification: NotificationData) => {
      // console.log(notification)
      addNotification(notification)
    })

    return () => {
      socket.off('notification')
    }
  }, [addNotification, socket])

  return (
    <ScrollArea
      data-type={type}
      className="mt-4 data-[type=pinned]:h-28 data-[type=all]:h-48"
    >
      <div className="space-y-4">
        {chats.map((chat) => (
          <Chat
            key={chat.id}
            active={roomId === chat.id}
            hasUnpinnOption={type === 'pinned'}
            hasPinnOption={type === 'all'}
            chat={chat}
          />
        ))}
      </div>
    </ScrollArea>
  )
}
