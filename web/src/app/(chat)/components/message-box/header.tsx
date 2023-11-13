import { Avatar } from '../avatar'
import { DateBox } from './date-box'

interface HeaderProps {
  member: {
    name: string
    avatar: string
  }
}

export function Header({ member }: HeaderProps) {
  return (
    <header className="h-20 bg-zinc-800 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar
          variant="dark"
          src={member.avatar}
          alt={`${member.name}'s avatar`}
        />

        <span className="block text-xl text-zinc-200">{member.name}</span>
      </div>

      <DateBox />
    </header>
  )
}
