import { Avatar } from '../avatar'

export function Header() {
  return (
    <header className="h-20 bg-zinc-800 p-4 border-b border-zinc-700 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar variant="dark" />

        <span className="block text-xl text-zinc-200">Jhon Doe</span>
      </div>

      <span className="block text-zinc-400">September 30, 2023</span>
    </header>
  )
}
