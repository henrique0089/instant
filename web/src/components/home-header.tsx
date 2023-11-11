'use client'

import { useUser } from '@clerk/nextjs'

import Link from 'next/link'
import { Button } from './ui/button'

export function HomeHeader() {
  const { isSignedIn } = useUser()

  return (
    <header className="h-20 flex items-start justify-between">
      <div>
        <h1 className="text-zinc-200 text-2xl font-semibold">
          Welcome to Instant
        </h1>
        <p className="text-zinc-500">Talk to your friends now!</p>
      </div>

      {isSignedIn && (
        <Button
          asChild
          className="bg-purple-700 hover:brightness-90 hover:bg-purple-700"
        >
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      )}
    </header>
  )
}
