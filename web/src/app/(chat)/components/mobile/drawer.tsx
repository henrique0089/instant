'use client'

import { InboxIcon } from 'lucide-react'
import { Drawer as DrawerComponent } from 'vaul'
import { AddUserDialog } from '../add-user-dialog'
import { ChatsCounter } from '../chats-counter'
import { ChatsSection } from '../chats-section'
import { User } from '../inbox'
import { RestoreChatRoomsButton } from '../restore-chat-rooms-button'
import { SearchForm } from '../search-form'

interface DrawerProps {
  users: User[]
}

export function Drawer({ users }: DrawerProps) {
  return (
    <DrawerComponent.Root shouldScaleBackground>
      <DrawerComponent.Trigger>
        <InboxIcon className="h-9 w-9 stroke-zinc-700" />
      </DrawerComponent.Trigger>

      <DrawerComponent.Portal>
        <DrawerComponent.Overlay className="fixed inset-0 bg-black/40" />
        <DrawerComponent.Content className="bg-zinc-900 flex flex-col rounded-t-2xl h-[96%] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-zinc-200 font-semibold">Inbox</h2>

              <ChatsCounter />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <AddUserDialog users={users} />

              <RestoreChatRoomsButton />
            </div>

            <div className="mt-6">
              <SearchForm />
            </div>

            <ChatsSection />
          </div>
        </DrawerComponent.Content>
      </DrawerComponent.Portal>
    </DrawerComponent.Root>
  )
}
