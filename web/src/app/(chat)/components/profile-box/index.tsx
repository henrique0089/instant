import { Content } from './content'

export function ProfileBox() {
  return (
    <div className="h-screen w-60 bg-zinc-800 border-l border-zinc-700 py-6 flex flex-col justify-between">
      <header className="px-5">
        <h2 className="text-zinc-200 text-2xl font-medium">Profile</h2>
      </header>

      <Content />

      <footer className="text-zinc-500 text-xs text-center">
        &copy; 2023 Instant. All rights reserved.
      </footer>
    </div>
  )
}
