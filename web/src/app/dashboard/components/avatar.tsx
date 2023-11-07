import {
  Avatar as AvatarContainer,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { User } from 'lucide-react'

interface AvatarProps {
  variant?: 'default' | 'dark'
  size?: 'sm' | 'lg'
  src?: string
  alt?: string
}

export function Avatar({
  variant = 'default',
  size = 'sm',
  src,
  alt,
}: AvatarProps) {
  return (
    <AvatarContainer
      data-size={size}
      className="group data-[size=lg]:h-[120px] data-[size=lg]:w-[120px]"
    >
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback
        data-variant={variant}
        className="data-[variant=default]:bg-zinc-800 data-[variant=dark]:bg-zinc-900"
      >
        <User className="h-5 w-5 group-data-[size=lg]:h-12 group-data-[size=lg]:w-12 stroke-zinc-600" />
      </AvatarFallback>
    </AvatarContainer>
  )
}
