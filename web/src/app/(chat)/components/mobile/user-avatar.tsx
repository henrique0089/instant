'use client'

import { useUser } from '@clerk/nextjs'
import { Avatar } from '../avatar'

export function UserAvatar() {
  const { user } = useUser()

  return <Avatar src={user?.imageUrl} alt="Your profile image" />
}
