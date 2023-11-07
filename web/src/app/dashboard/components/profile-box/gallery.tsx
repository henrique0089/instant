import Image from 'next/image'

export function Gallery() {
  return (
    <ul className="mt-4 grid grid-cols-3 gap-4">
      <li>
        <Image
          src="/food.png"
          alt=""
          width={240}
          height={240}
          className="h-14 w-14 rounded-lg object-cover"
        />
      </li>

      <li>
        <Image
          src="/food.png"
          alt=""
          width={240}
          height={240}
          className="h-14 w-14 rounded-lg object-cover"
        />
      </li>

      <li>
        <Image
          src="/food.png"
          alt=""
          width={240}
          height={240}
          className="h-14 w-14 rounded-lg object-cover"
        />
      </li>

      <li>
        <Image
          src="/food.png"
          alt=""
          width={240}
          height={240}
          className="h-14 w-14 rounded-lg object-cover"
        />
      </li>

      <li>
        <Image
          src="/food.png"
          alt=""
          width={240}
          height={240}
          className="h-14 w-14 rounded-lg object-cover"
        />
      </li>

      <li>
        <Image
          src="/food.png"
          alt=""
          width={240}
          height={240}
          className="h-14 w-14 rounded-lg object-cover"
        />
      </li>
    </ul>
  )
}
