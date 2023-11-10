import { clerkClient, currentUser } from '@clerk/nextjs'

import { AddUserDialog } from './add-user-dialog'
import { ChatsSection } from './chats-section'
import { ChatsSelect } from './chats-select'
import { SearchInput } from './search-input'

export type User = {
  name: string
  email: string
  avatar: string
}

export async function Inbox() {
  const users = await clerkClient.users.getUserList()
  const loggedUser = await currentUser()
  const filterdUsers: User[] = users
    .filter((u) => u.id !== loggedUser?.id)
    .map((u) => {
      return {
        name: u.firstName ?? '',
        email: u.emailAddresses[0].emailAddress,
        avatar: u.imageUrl,
      }
    })

  return (
    <div className="h-screen w-60 bg-zinc-800 py-6 border-r border-zinc-700">
      <div className="px-4 flex items-center justify-between">
        <h2 className="text-2xl text-zinc-200 font-semibold">Inbox</h2>

        <span className="block text-xs text-zinc-200 font-semibold">
          <strong className="text-base">35</strong> chats
        </span>
      </div>

      <div className="px-4">
        <AddUserDialog users={filterdUsers} />
      </div>

      <div className="px-4 mt-4">
        <ChatsSelect />
      </div>

      <div className="px-4 mt-4">
        <form>
          <SearchInput />
        </form>
      </div>

      <ChatsSection />
    </div>
  )
}
