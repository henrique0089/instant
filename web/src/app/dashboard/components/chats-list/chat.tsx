import { Avatar } from '../avatar'
import { MenuDropdown } from './menu-dropdown'

interface ChatProps {
  active?: boolean
}

export function Chat({ active = false }: ChatProps) {
  return (
    <div
      data-active={active}
      className="h-[52px] relative data-[active=true]:bg-[#313133] data-[active=true]:before:content-[''] data-[active=true]:before:absolute data-[active=true]:before:bg-purple-700 data-[active=true]:before:w-[3px] data-[active=true]:before:left-0 data-[active=true]:before:top-0 data-[active=true]:before:bottom-0 flex items-center justify-between px-4"
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <Avatar variant="dark" />
          <div className="h-[18px] w-[18px] rounded-full bg-purple-700 text-zinc-200 text-[10px] flex items-center justify-center absolute -right-1 -bottom-1">
            +9
          </div>
        </div>

        <div className="space-y-1">
          <span className="block text-zinc-200 font-medium">Jhon doe</span>
          <span className="block text-zinc-200 text-xs">Hi, brooo!!!</span>
        </div>
      </div>

      <MenuDropdown />
    </div>
  )
}
