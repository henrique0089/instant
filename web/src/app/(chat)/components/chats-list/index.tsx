import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatRoom } from '@/store/chat-rooms-store'
import { useParams } from 'next/navigation'
import { Chat } from './chat'

interface ChatsListProps {
  type: 'pinned' | 'all'
  chats: ChatRoom[]
}

export function ChatsList({ type, chats }: ChatsListProps) {
  const params = useParams()
  const roomId = params.id

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
