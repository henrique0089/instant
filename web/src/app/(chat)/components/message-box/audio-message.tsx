import { Slider } from '@/components/ui/slider'
import { Play, VolumeX } from 'lucide-react'

interface AudioMessageProps {
  dir?: 'left' | 'right'
}

export function AudioMessage({ dir = 'left' }: AudioMessageProps) {
  return (
    <div
      data-dir={dir}
      className="h-14 w-[304px] py-2 px-4 bg-zinc-800 flex items-center gap-4 rounded-lg data-[dir=left]:rounded-tl-none data-[dir=right]:rounded-tr-none"
    >
      <div>
        <button className="h-10 w-10 rounded-full bg-purple-700 flex items-center justify-center hover:brightness-90 transition-colors">
          <Play className="h-5 w-5 fill-zinc-200 stroke-zinc-200 ml-1" />
        </button>
      </div>

      <Slider defaultValue={[33]} max={100} step={1} />

      <span className="block text-zinc-200 text-xs select-none">1:28</span>

      <button className="hover:brightness-75 transition-colors">
        <VolumeX className="h-6 w-6 stroke-zinc-200" />
      </button>
    </div>
  )
}
