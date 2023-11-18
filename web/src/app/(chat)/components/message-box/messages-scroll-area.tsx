'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { socketInstance } from '@/lib/socket.io-client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AudioMessage } from './audio-message'
import { ImageMessage } from './image-message'
import { Message } from './message'
import { TextMessageBox } from './text-message'

interface MessagesScrollAreaProps {
  token: string
}

export function MessagesScrollArea({ token }: MessagesScrollAreaProps) {
  const [socket] = useState(socketInstance(token))
  const params = useParams()

  useEffect(() => {
    socket.emit('start', { roomId: params.id })
  })

  return (
    <ScrollArea className="message-box-h bg-zinc-900 pt-5 px-6 pb-24">
      <div className="space-y-6">
        <Message>
          <TextMessageBox>ajshashajhs</TextMessageBox>
        </Message>
        <Message dir="right">
          <TextMessageBox variant="purple">ajshashajhs</TextMessageBox>
        </Message>
        <Message>
          <TextMessageBox>ajshashajhs</TextMessageBox>
        </Message>
        <Message dir="right">
          <TextMessageBox variant="purple">ajshashajhs</TextMessageBox>
        </Message>
        <Message>
          <ImageMessage src="/food.png" alt="food" />
        </Message>
        <Message dir="right">
          <ImageMessage src="/food.png" alt="food" dir="right" />
        </Message>

        <Message>
          <AudioMessage />
        </Message>

        <Message dir="right">
          <AudioMessage dir="right" />
        </Message>

        <Message dir="right">
          <AudioMessage dir="right" />
        </Message>
      </div>
    </ScrollArea>
  )
}
