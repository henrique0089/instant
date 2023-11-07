import { ReactNode } from 'react'

interface TextMessageBoxProps {
  variant?: 'zinc' | 'purple'
  children: ReactNode
}

export function TextMessageBox({
  variant = 'zinc',
  children,
}: TextMessageBoxProps) {
  return (
    <div
      data-variant={variant}
      className="w-full p-3 text-zinc-200 rounded-lg data-[variant=zinc]:rounded-tl-none data-[variant=purple]:rounded-tr-none data-[variant=zinc]:bg-zinc-800 data-[variant=purple]:bg-purple-700"
    >
      {children}
    </div>
  )
}
