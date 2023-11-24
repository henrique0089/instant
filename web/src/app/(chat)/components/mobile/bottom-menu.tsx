import Image from 'next/image'
import Link from 'next/link'
import { Drawer } from './drawer'

import { clerkClient, currentUser } from '@clerk/nextjs'
import { User } from '../inbox'
import { SignoutButton } from '../signout-button'
import { UserAvatar } from './user-avatar'

export async function BottomMenu() {
  const users = await clerkClient.users.getUserList()
  const loggedUser = await currentUser()
  const filteredUsers: User[] = users
    .filter((u) => u.id !== loggedUser?.id)
    .map((u) => {
      return {
        id: u.id,
        name: u.firstName ?? '',
        email: u.emailAddresses[0].emailAddress,
        avatar: u.imageUrl,
      }
    })

  return (
    <footer className="absolute bottom-0 h-20 w-full px-4 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between lg:hidden">
      <Link href="/dashboard">
        <Image
          src="/logo.svg"
          alt=""
          width={138}
          height={108}
          className="h-[36px] w-[46px]"
        />
      </Link>

      <Drawer users={filteredUsers} />

      <SignoutButton />

      <UserAvatar />
    </footer>
  )
}
