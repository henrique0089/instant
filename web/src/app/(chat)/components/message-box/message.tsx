import dayjs from 'dayjs'
import { ReactNode } from 'react'

import { Avatar } from '../avatar'

interface MessageProps {
  dir?: 'left' | 'right'
  avatar: string
  createdAt: Date
  children: ReactNode
}

export function Message({
  dir = 'left',
  avatar,
  createdAt,
  children,
}: MessageProps) {
  const date = new Date(createdAt)
  const formattedDate = dayjs(createdAt).format('HH:mm')

  if (dir === 'right') {
    return (
      <div className="flex items-start gap-3 max-w-[358px] w-full ml-auto">
        <div className="space-y-2 ml-auto">
          {children}
          <span className="block text-right text-xs text-zinc-400">
            {formattedDate} {date.getHours() < 12 ? 'pm' : 'am'}
          </span>
        </div>
        <Avatar src={avatar} />
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3 max-w-[358px] w-full">
      <Avatar src={avatar} />
      <div className="space-y-2">
        {children}
        <span className="block text-xs text-zinc-400">11:25 pm</span>
      </div>
    </div>
  )
}
