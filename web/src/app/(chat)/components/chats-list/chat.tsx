import { ChatRoom } from '@/store/chat-rooms-store'
import Link from 'next/link'
import { Avatar } from '../avatar'
import { MenuDropdown } from './menu-dropdown'

interface ChatProps {
  active?: boolean
  hasUnpinnOption?: boolean
  hasPinnOption?: boolean
  chat: ChatRoom
}

export function Chat({
  active = false,
  hasUnpinnOption = false,
  hasPinnOption = false,
  chat,
}: ChatProps) {
  return (
    <Link
      href={`/room/${chat.id}?m=${chat.member.id}`}
      data-active={active}
      className="h-[52px] relative data-[active=true]:bg-[#313133] data-[active=true]:before:content-[''] data-[active=true]:before:absolute data-[active=true]:before:bg-purple-700 data-[active=true]:before:w-[3px] data-[active=true]:before:left-0 data-[active=true]:before:top-0 data-[active=true]:before:bottom-0 flex items-center justify-between px-4"
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <Avatar
            variant="dark"
            src={chat.member.avatar}
            alt={`${chat.member.name}'s avatar`}
          />
          <div className="h-4 w-4 rounded-full bg-purple-700 flex items-center justify-center absolute -right-1 -bottom-1" />
        </div>

        <div className="space-y-1">
          <span className="block text-zinc-200 font-medium">
            {chat.member.name}
          </span>
          <span
            title={chat.member.email}
            className="block w-28 truncate text-zinc-200 text-xs"
          >
            {chat.member.email}
          </span>
        </div>
      </div>

      <div onClick={(e) => e.preventDefault()}>
        <MenuDropdown
          roomId={chat.id}
          memberName={chat.member.name}
          memberEmail={chat.member.email}
          memberAvatar={chat.member.avatar}
          hasUnpinnOption={hasUnpinnOption}
          hasPinnOption={hasPinnOption}
        />
      </div>
    </Link>
  )
}
