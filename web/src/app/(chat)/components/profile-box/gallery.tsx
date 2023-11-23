import Image from 'next/image'

interface GalleryProps {
  images: string[]
}

export function Gallery({ images }: GalleryProps) {
  return (
    <ul className="mt-4 grid grid-cols-3 gap-4">
      {images.map((image) => (
        <li key={image}>
          <Image
            src={image}
            alt=""
            width={240}
            height={240}
            className="h-14 w-14 rounded-lg object-cover"
          />
        </li>
      ))}
    </ul>
  )
}
