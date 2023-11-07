import { SignUp, auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function Page() {
  const { sessionId } = auth()

  if (sessionId) redirect('/dashboard')

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-6">
      <header>
        <Link href="/">
          <Image
            src="/logo.svg"
            alt=""
            width={138}
            height={108}
            className="h-[36px] w-[46px]"
          />
        </Link>
      </header>
      <SignUp />
    </main>
  )
}
