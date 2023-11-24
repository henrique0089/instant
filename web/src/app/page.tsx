import { HomeHeader } from '@/components/home-header'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-2">
      <div className="hidden lg:flex bg-zinc-950 items-center justify-center">
        <Image src="/logo.svg" alt="" width={138} height={108} />
      </div>
      <div className="bg-zinc-900 min-h-screen p-4">
        <HomeHeader />

        <div className="mt-32 max-w-sm w-full mx-auto flex flex-col gap-4 self-center">
          <Button asChild className="bg-zinc-800 hover:bg-zinc-800/80">
            <Link href="/sign-in" className="block">
              Sign In
            </Link>
          </Button>

          <Button asChild className=" bg-purple-700 hover:bg-purple-700/80">
            <Link href="/sign-up" className="block">
              Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
