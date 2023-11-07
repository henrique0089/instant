import { ReactNode } from 'react'
import { Avatar } from '../avatar'

interface MessageProps {
  dir?: 'left' | 'right'
  children: ReactNode
}

export function Message({ dir = 'left', children }: MessageProps) {
  if (dir === 'right') {
    return (
      <div className="flex items-start gap-3 max-w-[358px] w-full ml-auto">
        <div className="space-y-2 ml-auto">
          {children}
          <span className="block text-right text-xs text-zinc-400">
            11:25 pm
          </span>
        </div>
        <Avatar />
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3 max-w-[358px] w-full">
      <Avatar />
      <div className="space-y-2">
        {children}
        <span className="block text-xs text-zinc-400">11:25 pm</span>
      </div>
    </div>
  )
}
