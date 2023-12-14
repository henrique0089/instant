import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { api } from '@/lib/axios'
import { ChatRoom, useChatRoomsStore } from '@/store/chat-rooms-store'
import { useAuth } from '@clerk/nextjs'
import { MoreVertical, Pin, PinOff, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Avatar } from '../avatar'

interface MenuDropdownProps {
  roomId: string
  memberName: string
  memberEmail: string
  memberAvatar: string
  hasUnpinnOption?: boolean
  hasPinnOption?: boolean
}

type PinnedChatRoomResponse = {
  pinnedChatRoom: ChatRoom
}

export function MenuDropdown({
  roomId,
  memberName,
  memberEmail,
  memberAvatar,
  hasPinnOption = false,
  hasUnpinnOption = false,
}: MenuDropdownProps) {
  const [open, setOpen] = useState(false)
  const { getToken } = useAuth()
  const params = useParams()
  const { push } = useRouter()
  const [pinnedChatRooms, pin, unpin, remove] = useChatRoomsStore((state) => [
    state.pinnedChatRooms,
    state.pin,
    state.unpin,
    state.remove,
  ])

  async function handleDeleteChatRoom() {
    const token = await getToken()

    try {
      await api.delete(`/chats/delete/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const isPinned = pinnedChatRooms.some((r) => r.id === roomId)

      remove(roomId, isPinned)

      if (params.id) {
        push('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handlePinChat() {
    const token = await getToken()

    try {
      const { data } = await api.get<PinnedChatRoomResponse>(
        `/chats/pin/${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      pin(data.pinnedChatRoom)
      // add tooltip
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUnpinChat() {
    const token = await getToken()

    try {
      await api.delete(`/chats/unpin/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      unpin(roomId)
      // add tooltip
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="group">
          <MoreVertical className="h-5 w-5 stroke-zinc-500 group-hover:stroke-zinc-400" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-zinc-900 border-zinc-800"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="flex items-center gap-2 px-1">
          <Avatar src={memberAvatar} alt={`${memberName}'avatar`} />
          <div className="space-y-1">
            <p className="text-sm text-zinc-200 font-medium leading-none">
              {memberName}
            </p>
            <p className="block w-28 truncate text-xs text-zinc-500 leading-none">
              {memberEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleDeleteChatRoom}
            className="group hover:bg-zinc-800"
          >
            <span className="text-zinc-200">Remove from list</span>
            <DropdownMenuShortcut>
              <Trash className="h-5 w-5 stroke-zinc-700 group-hover:stroke-zinc-500 transition-colors" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          {hasPinnOption && (
            <DropdownMenuItem
              className="group hover:bg-zinc-800"
              onClick={handlePinChat}
            >
              <span className="text-zinc-200">Pin</span>
              <DropdownMenuShortcut>
                <Pin className="h-5 w-5 stroke-zinc-700 group-hover:stroke-zinc-500 transition-colors" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}

          {hasUnpinnOption && (
            <DropdownMenuItem
              className="group hover:bg-zinc-800"
              onClick={handleUnpinChat}
            >
              <span className="text-zinc-200">Unpin</span>
              <DropdownMenuShortcut>
                <PinOff className="h-5 w-5 stroke-zinc-700 group-hover:stroke-zinc-500 transition-colors" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
