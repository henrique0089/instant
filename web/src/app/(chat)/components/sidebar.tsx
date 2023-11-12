'use client'

import { Separator } from '@/components/ui/separator'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar } from './avatar'
import { SignoutButton } from './signout-button'

export function Sidebar() {
  const { user } = useUser()

  return (
    <aside className="h-screen w-20 bg-zinc-900 py-9 px-4 flex flex-col justify-between">
      <Link href="/dashboard">
        <Image
          src="/logo.svg"
          alt=""
          width={138}
          height={108}
          className="h-[36px] w-[46px]"
        />
      </Link>

      <div className="flex flex-col items-center gap-5">
        <SignoutButton />

        <Separator className="bg-zinc-800" />

        <Avatar src={user?.imageUrl} alt="Your profile image" />
      </div>
    </aside>
  )
}
