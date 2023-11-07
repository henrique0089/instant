import { Search } from 'lucide-react'

export function SearchInput() {
  return (
    <div className="h-9 px-[10px] rounded-sm bg-zinc-900 border border-zinc-700 flex items-center gap-2 focus-within:border-purple-700 transition-colors">
      <input
        type="text"
        placeholder="Jhon doe"
        className="h-full w-full bg-transparent focus:outline-none text-sm text-zinc-200 placeholder:text-zinc-400"
      />

      <button>
        <Search className="h-4 w-4 stroke-zinc-400" />
      </button>
    </div>
  )
}
