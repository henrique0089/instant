import { Separator } from '@/components/ui/separator'
import { MessageCircle, Pin } from 'lucide-react'
import { AddUserDialog } from './add-user-dialog'
import { ChatsList } from './chats-list'
import { ChatsSelect } from './chats-select'
import { SearchInput } from './search-input'

export function Inbox() {
  return (
    <div className="h-screen w-60 bg-zinc-800 py-6 border-r border-zinc-700">
      <div className="px-4 flex items-center justify-between">
        <h2 className="text-2xl text-zinc-200 font-semibold">Inbox</h2>

        <span className="block text-xs text-zinc-200 font-semibold">
          <strong className="text-base">35</strong> chats
        </span>
      </div>

      <div className="px-4">
        <AddUserDialog />
      </div>

      <div className="px-4 mt-4">
        <ChatsSelect />
      </div>

      <div className="px-4 mt-4">
        <form>
          <SearchInput />
        </form>
      </div>

      <div className="mt-4">
        <h3 className="px-4 text-zinc-400 text-sm font-medium flex items-center gap-2">
          <Pin className="h-5 w-5 stroke-zinc-400" /> Pinned
        </h3>

        <ChatsList type="pinned" />
      </div>

      <div className="px-4 my-6">
        <Separator className="bg-zinc-700" />
      </div>

      <div>
        <h3 className="px-4 text-zinc-400 text-sm font-medium flex items-center gap-2">
          <MessageCircle className="h-5 w-5 stroke-zinc-400" /> All Chats
        </h3>

        <ChatsList type="all" />
      </div>
    </div>
  )
}
