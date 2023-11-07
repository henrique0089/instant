import { MessageCircle } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="flex-1 min-h-screen h-full bg-zinc-900 flex flex-col items-center justify-center">
      <MessageCircle className="h-28 w-28 stroke-zinc-700" />
      <h1 className="mt-2 text-2xl text-zinc-600">Talk to your friends now!</h1>
    </div>
  )
}
