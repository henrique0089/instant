import { clerkClient, currentUser } from '@clerk/nextjs'

import { AddUserDialog } from './add-user-dialog'
import { ChatsCounter } from './chats-counter'
import { ChatsSection } from './chats-section'
import { RestoreChatRoomsButton } from './restore-chat-rooms-button'
import { SearchForm } from './search-form'

export type User = {
  id: string
  name: string
  email: string
  avatar: string
}

export async function Inbox() {
  const users = await clerkClient.users.getUserList()
  const loggedUser = await currentUser()
  const filteredUsers: User[] = users
    .filter((u) => u.id !== loggedUser?.id)
    .map((u) => {
      return {
        id: u.id,
        name: u.firstName ?? '',
        email: u.emailAddresses[0].emailAddress,
        avatar: u.imageUrl,
      }
    })

  return (
    <div className="h-screen w-60 bg-zinc-800 py-6 border-r border-zinc-700">
      <div className="px-4 flex items-center justify-between">
        <h2 className="text-2xl text-zinc-200 font-semibold">Inbox</h2>

        <ChatsCounter />
      </div>

      <div className="px-4 flex items-center justify-between">
        <AddUserDialog users={filteredUsers} />

        <RestoreChatRoomsButton />
      </div>

      <div className="px-4 mt-4">
        <SearchForm />
      </div>

      <ChatsSection />
    </div>
  )
}
