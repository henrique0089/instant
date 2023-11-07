'use client'

import { useState } from 'react'
import { ChatSelect } from './chat-select'

export function ChatsSelect() {
  const [selectedChat, setSelectedChat] = useState<'all' | 'pinned'>('all')

  return (
    <div className="p-1 bg-zinc-900 rounded-sm flex items-center gap-1">
      <ChatSelect
        data-active={selectedChat === 'all' && 'true'}
        onClick={() => setSelectedChat('all')}
      >
        All
      </ChatSelect>
      <ChatSelect
        data-active={selectedChat === 'pinned' && 'true'}
        onClick={() => setSelectedChat('pinned')}
      >
        Pinned
      </ChatSelect>
    </div>
  )
}
