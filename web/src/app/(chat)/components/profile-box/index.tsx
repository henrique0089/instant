import { Avatar } from '../avatar'
import { Gallery } from './gallery'

export function ProfileBox() {
  return (
    <div className="h-screen w-60 bg-zinc-800 py-6 border-l border-zinc-700 flex flex-col justify-between">
      <header className="px-5">
        <h2 className="text-zinc-200 text-2xl font-medium">Profile</h2>
      </header>

      <div className="px-5">
        <div className="flex flex-col items-center">
          <Avatar variant="dark" size="lg" />

          <h2 className="mt-3 text-zinc-200 text-2xl font-medium">Jhon Doe</h2>
          <span className="text-zinc-400 text-sm">jhondoe942@gmail.com</span>
        </div>

        <div className="mt-6">
          <h3 className="text-zinc-500 text-sm">Media (23)</h3>

          <Gallery />
        </div>
      </div>

      <footer className="text-zinc-500 text-xs text-center">
        &copy; 2023 Instant. All rights reserved.
      </footer>
    </div>
  )
}
