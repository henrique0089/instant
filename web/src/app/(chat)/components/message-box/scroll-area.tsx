import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ScrollAreaProps {
  className?: string
  ref?: React.Ref<HTMLDivElement>
  children: ReactNode
}

export function ScrollArea({ className, ref, children }: ScrollAreaProps) {
  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <div className="h-full w-full overflow-y-scroll">{children}</div>
    </div>
  )
}
