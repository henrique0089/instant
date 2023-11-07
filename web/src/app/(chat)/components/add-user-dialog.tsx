'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { UserPlus } from 'lucide-react'
import { useState } from 'react'
import { Avatar } from './avatar'

type User = {
  name: string
  email: string
  avatar: string
}

const users: User[] = [
  {
    name: 'Olivia Martin',
    email: 'm@example.com',
    avatar: '/avatars/01.png',
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    avatar: '/avatars/03.png',
  },
  {
    name: 'Emma Wilson',
    email: 'emma@example.com',
    avatar: '/avatars/05.png',
  },
  {
    name: 'Jackson Lee',
    email: 'lee@example.com',
    avatar: '/avatars/02.png',
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    avatar: '/avatars/04.png',
  },
  {
    name: 'Jhon Doe',
    email: 'jhondoe@email.com',
    avatar: '/avatars/05.png',
  },
  {
    name: 'Henrique Monteiro',
    email: 'henriquemonteiro037@email.com',
    avatar: '/avatars/06.png',
  },
]

export function AddUserDialog() {
  const [open, setOpen] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

  function handleSelectUser(user: User) {
    if (selectedUsers.some((u) => u.email === user.email)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== user))
    } else {
      setSelectedUsers((state) => [...state, user])
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 flex items-center gap-2 hover:brightness-90"
      >
        <UserPlus className="h-5 w-5 stroke-purple-700" />{' '}
        <span className="text-purple-700">Add</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none bg-zinc-950 border-zinc-800">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle className="text-zinc-200">New Chat Room</DialogTitle>
            <DialogDescription className="text-zinc-500">
              Add a user to your chat list. This will create a new chat room for
              each user and you.
            </DialogDescription>
          </DialogHeader>

          <Command className="overflow-hidden rounded-t-none border-t border-zinc-800 bg-transparent">
            <CommandInput
              placeholder="Search user..."
              className="text-zinc-200"
            />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup className="p-2">
                {users.map((user) => (
                  <CommandItem
                    key={user.email}
                    onSelect={() => handleSelectUser(user)}
                  >
                    <Avatar variant="dark" />
                    <div className="ml-2">
                      <span className="text-zinc-200 text-sm font-medium leading-none">
                        {user.name}
                      </span>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>

          <DialogFooter className="flex items-center border-t border-zinc-800 p-4 sm:justify-between">
            {selectedUsers.length > 0 ? (
              <div className="flex -space-x-2 overflow-hidden">
                {selectedUsers.map((user) => (
                  <Avatar key={user.email} variant="dark" />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select users to add to your chat list.
              </p>
            )}
            <Button
              disabled={selectedUsers.length === 0}
              onClick={() => {
                setOpen(false)
              }}
              className="bg-zinc-800"
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
