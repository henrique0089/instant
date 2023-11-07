import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Trash } from 'lucide-react'
import { Avatar } from '../avatar'

export function MenuDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group">
          <MoreVertical className="h-5 w-5 stroke-zinc-500 group-hover:stroke-zinc-400" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-zinc-900 border-zinc-800"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="flex items-center gap-2 px-1">
          <Avatar />
          <div className="space-y-1">
            <p className="text-sm text-zinc-200 font-medium leading-none">
              Jhon doe
            </p>
            <p className="text-xs text-zinc-500 leading-none">
              jhondoe@gmail.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="group hover:bg-zinc-800">
            <span className="text-zinc-200">Remove from list</span>
            <DropdownMenuShortcut>
              <Trash className="h-5 w-5 stroke-zinc-700 group-hover:stroke-zinc-500 transition-colors" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
