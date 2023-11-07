import Image from 'next/image'

interface ImageMessageProps {
  src: string
  alt: string
  dir?: 'left' | 'right'
}

export function ImageMessage({ src, alt, dir = 'left' }: ImageMessageProps) {
  return (
    <Image
      data-dir={dir}
      src={src}
      alt={alt}
      width={750}
      height={474}
      className="w-[250px] h-[158px] object-cover rounded-lg data-[dir=left]:rounded-tl-none data-[dir=right]:rounded-tr-none"
    />
  )
}
