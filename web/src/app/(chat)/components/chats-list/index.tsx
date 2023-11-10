import { ScrollArea } from '@/components/ui/scroll-area'
import { Chat } from './chat'

interface ChatsListProps {
  type: 'pinned' | 'all'
}

export function ChatsList({ type }: ChatsListProps) {
  return (
    <ScrollArea
      data-type={type}
      className="mt-4 data-[type=pinned]:h-28 data-[type=all]:h-48"
    >
      <div className="space-y-4">
        <Chat hasUnpinnOption={type === 'pinned'} />
        <Chat hasUnpinnOption={type === 'pinned'} />
        <Chat hasUnpinnOption={type === 'pinned'} />
        <Chat hasUnpinnOption={type === 'pinned'} />
        <Chat hasUnpinnOption={type === 'pinned'} />
      </div>
    </ScrollArea>
  )
}
