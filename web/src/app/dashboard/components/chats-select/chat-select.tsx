import { ComponentProps } from 'react'

type ChatSelectProps = ComponentProps<'button'>

export function ChatSelect({ ...props }: ChatSelectProps) {
  return (
    <button
      {...props}
      className="h-6 w-full rounded-[2px] bg-transparent data-[active=true]:bg-zinc-800 text-sm text-zinc-400 data-[active=true]:text-zinc-200"
    />
  )
}
