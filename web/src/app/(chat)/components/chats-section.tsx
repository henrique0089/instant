'use client'

import { useAuth } from '@clerk/nextjs'
import { MessageCircle, Pin } from 'lucide-react'
import { useEffect } from 'react'
import { Separator } from '../../../components/ui/separator'
import { ChatsList } from './chats-list'

export function ChatsSection() {
  const { getToken } = useAuth()

  useEffect(() => {
    async function loadChats() {
      const token = await getToken()

      // const { data } = await api.get('/chats', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // })

      console.log(token)
    }

    loadChats()
  }, [getToken])

  return (
    <>
      <div className="mt-4">
        <h3 className="px-4 text-zinc-400 text-sm font-medium flex items-center gap-2">
          <Pin className="h-5 w-5 stroke-zinc-400" /> Pinned
        </h3>

        <ChatsList type="pinned" />
      </div>

      <div className="px-4 my-6">
        <Separator className="bg-zinc-700" />
      </div>

      <div>
        <h3 className="px-4 text-zinc-400 text-sm font-medium flex items-center gap-2">
          <MessageCircle className="h-5 w-5 stroke-zinc-400" /> All Chats
        </h3>

        <ChatsList type="all" />
      </div>
    </>
  )
}
