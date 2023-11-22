import { ChatRoom } from '@/store/chat-rooms-store'
import { useMessagesStore } from '@/store/messages-store'
import { useUser } from '@clerk/nextjs'
import { useParams, useRouter } from 'next/navigation'
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
  const params = useParams()
  const router = useRouter()
  const { user } = useUser()
  const [notifications, removeNotification] = useMessagesStore((state) => [
    state.notifications,
    state.removeNotification,
  ])
  const possibleNotification = notifications.find((n) => n.roomId === chat.id)
  const hasNotification =
    possibleNotification &&
    (params.id !== chat.id || !params.id) &&
    possibleNotification.senderId !== user?.id

  function handleNavigateToChatRoom() {
    if (hasNotification) {
      removeNotification(chat.id)
    }

    router.push(`/room/${chat.id}`)
  }

  return (
    <div
      data-active={active}
      onClick={handleNavigateToChatRoom}
      className="h-[52px] relative data-[active=true]:bg-[#313133] data-[active=true]:before:content-[''] data-[active=true]:before:absolute data-[active=true]:before:bg-purple-700 data-[active=true]:before:w-[3px] data-[active=true]:before:left-0 data-[active=true]:before:top-0 data-[active=true]:before:bottom-0 hover:cursor-pointer flex items-center justify-between px-4"
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <Avatar
            variant="dark"
            src={chat.member.avatar}
            alt={`${chat.member.name}'s avatar`}
          />
          {hasNotification && (
            <div className="h-4 w-4 rounded-full bg-purple-700 flex items-center justify-center absolute -right-1 -bottom-1" />
          )}
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
    </div>
  )
}
