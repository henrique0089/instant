import { Separator } from '@/components/ui/separator'
import { ImageIcon, Mic, Send } from 'lucide-react'

export function MessageForm() {
  return (
    <form>
      <div className="h-16 w-full bg-zinc-800 py-[10px] rounded-md px-4 border border-zinc-700 flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center gap-2">
          <button type="button" className="group">
            <Mic className="h-6 w-6 stroke-zinc-400 group-hover:stroke-zinc-300" />
          </button>

          <input
            className="flex-1 h-full bg-transparent focus:outline-none text-zinc-200 placeholder:text-zinc-500"
            placeholder="Type a message"
          />
        </div>

        <div className="flex items-center gap-5">
          <button type="button" className="group">
            <ImageIcon className="h-6 w-6 stroke-zinc-400 group-hover:stroke-zinc-300" />
          </button>

          <Separator orientation="vertical" className="bg-zinc-700 h-6" />

          <button className="group">
            <Send className="h-6 w-6 stroke-zinc-400 group-hover:stroke-zinc-300" />
          </button>
        </div>
      </div>
    </form>
  )
}
