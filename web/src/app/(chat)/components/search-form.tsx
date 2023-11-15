'use client'

import { api } from '@/lib/axios'
import { ChatRoom, useChatRoomsStore } from '@/store/chat-rooms-store'
import { useAuth } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import { FormEvent, useRef } from 'react'

export function SearchForm() {
  const [setAllChatRooms] = useChatRoomsStore((state) => [
    state.setAllChatRooms,
  ])
  const { getToken } = useAuth()

  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSearchChat(e: FormEvent) {
    e.preventDefault()

    const inputVal = inputRef.current?.value
    if (!inputVal) return

    const token = await getToken()
    const name = inputVal.charAt(0).toUpperCase() + inputVal.slice(1)

    const res = await api.get<ChatRoom[]>('/chats/search', {
      params: {
        username: name,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setAllChatRooms(res.data)

    inputRef.current.value = ''
  }

  return (
    <form
      onSubmit={handleSearchChat}
      className="flex-1 h-9 px-[10px] rounded-sm bg-zinc-900 border border-zinc-700 flex items-center gap-2 focus-within:border-purple-700 transition-colors"
    >
      <input
        type="text"
        placeholder="Jhon doe"
        ref={inputRef}
        className="h-full w-full bg-transparent focus:outline-none text-sm text-zinc-200 placeholder:text-zinc-400"
      />

      <button>
        <Search className="h-4 w-4 stroke-zinc-400" />
      </button>
    </form>
  )
}
