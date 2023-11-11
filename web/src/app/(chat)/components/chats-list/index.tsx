import { ScrollArea } from '@/components/ui/scroll-area'
import { DefaultChatRoom } from '@/store/chat-rooms-store'
import { Chat } from './chat'

interface ChatsListProps {
  type: 'pinned' | 'all'
  chats: DefaultChatRoom[]
}

export function ChatsList({ type, chats }: ChatsListProps) {
  return (
    <ScrollArea
      data-type={type}
      className="mt-4 data-[type=pinned]:h-28 data-[type=all]:h-48"
    >
      <div className="space-y-4">
        {chats.map((chat) => (
          <Chat
            key={chat.id}
            hasUnpinnOption={type === 'pinned'}
            hasPinnOption={type === 'all'}
            chat={chat}
          />
        ))}
      </div>
    </ScrollArea>
  )
}
