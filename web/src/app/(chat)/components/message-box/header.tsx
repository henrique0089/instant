import { Avatar } from '../avatar'
import { DateBox } from './date-box'

export function Header() {
  return (
    <header className="h-20 bg-zinc-800 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar variant="dark" />

        <span className="block text-xl text-zinc-200">Jhon Doe</span>
      </div>

      <DateBox />
    </header>
  )
}
