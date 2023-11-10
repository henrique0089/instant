'use client'

import { UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'

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
import { Avatar } from './avatar'
import { User } from './inbox'

interface AddUserDialogProps {
  users: User[]
}

export function AddUserDialog({ users }: AddUserDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [searchUser, setSearchUser] = useState('')

  function handleSelectUser(user: User) {
    if (selectedUsers.some((u) => u.email === user.email)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== user))
    } else {
      setSelectedUsers((state) => [...state, user])
    }
  }

  useEffect(() => {
    if (searchUser) {
      setSelectedUsers((prev) =>
        prev.filter((user) => user.name.includes(searchUser)),
      )
    }
  }, [searchUser])

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
              value={searchUser}
              onValueChange={setSearchUser}
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
                    <Avatar
                      variant="dark"
                      src={user.avatar}
                      alt={`${user.name}'s avatar`}
                    />
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
                  <Avatar
                    key={user.email}
                    variant="dark"
                    src={user.avatar}
                    alt={`${user.name}'s avatar`}
                  />
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
                setSearchUser('')
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
