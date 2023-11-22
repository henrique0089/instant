'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { socketInstance } from '@/lib/socket.io-client'
import { MessageData, useMessagesStore } from '@/store/messages-store'
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AudioMessage } from './audio-message'
import { ImageMessage } from './image-message'
import { Message } from './message'
import { TextMessageBox } from './text-message'

type MessagesResponse = {
  messages: MessageData[]
}

export function MessagesScrollArea() {
  const { user } = useUser()
  const [socket] = useState(socketInstance(user?.id))
  const params = useParams()

  const [messages, setMessages, addMessage] = useMessagesStore((state) => [
    state.messages,
    state.setMessages,
    state.addMessage,
  ])

  useEffect(() => {
    socket.emit('start', { roomId: params.id }, (data: MessagesResponse) =>
      setMessages(data.messages),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    socket.on('message', (message: MessageData) => {
      addMessage(message)
    })

    return () => {
      socket.off('message')
    }
  }, [addMessage, socket])

  return (
    <ScrollArea className="message-box-h bg-zinc-900 pt-5 px-4 pb-24">
      <div className="space-y-6 px-2">
        {messages.map((message) => {
          const dir = message.senderId === user?.id ? 'right' : 'left'

          return (
            <div key={message.id}>
              {message.type === 'TEXT' ? (
                <Message
                  dir={dir}
                  avatar={
                    message.senderAvatar === user?.id
                      ? message.recipientAvatar
                      : message.senderAvatar
                  }
                  createdAt={message.createdAt}
                >
                  <TextMessageBox
                    variant={message.senderId === user?.id ? 'purple' : 'zinc'}
                  >
                    {message.content}
                  </TextMessageBox>
                </Message>
              ) : message.type === 'IMAGE' ? (
                <Message
                  dir={dir}
                  avatar={
                    message.senderAvatar === user?.id
                      ? message.recipientAvatar
                      : message.senderAvatar
                  }
                  createdAt={message.createdAt}
                >
                  <ImageMessage
                    src={String(message.url)}
                    alt="food"
                    dir={dir}
                  />
                </Message>
              ) : (
                <Message
                  dir={dir}
                  avatar={
                    message.senderAvatar === user?.id
                      ? message.recipientAvatar
                      : message.senderAvatar
                  }
                  createdAt={message.createdAt}
                >
                  <AudioMessage dir={dir} />
                </Message>
              )}
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
