'use client'

import { Separator } from '@/components/ui/separator'
import { socketInstance } from '@/lib/socket.io-client'
import { useUser } from '@clerk/nextjs'
import { ImageIcon, Mic, Send } from 'lucide-react'
import { useParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

export function MessageForm() {
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const { user } = useUser()
  const params = useParams()
  const [socket] = useState(socketInstance(user?.id))

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const data = {
      content,
      senderId: user?.id,
      type: 'TEXT',
      roomId: params.id,
    }

    socket.emit('text-message', data)

    setContent('')
  }

  function onChangeImage(files: FileList | null) {
    if (!files || files.length < 1) return

    setImage(files[0])
  }

  useEffect(() => {
    if (image) {
      socket.emit('image-message', {
        image,
        senderId: user?.id,
        roomId: params.id,
      })

      setImage(null)
    }
  }, [image, params.id, socket, user?.id])

  return (
    <form
      onSubmit={handleSubmit}
      className="h-16 w-full bg-zinc-800 py-[10px] rounded-md px-4 border border-zinc-700 flex items-center justify-between gap-4"
    >
      <div className="flex-1 flex items-center gap-2">
        <button type="button" className="group">
          <Mic className="h-6 w-6 stroke-zinc-400 group-hover:stroke-zinc-300" />
        </button>

        <input
          placeholder="Type a message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 h-full bg-transparent focus:outline-none text-zinc-200 placeholder:text-zinc-500"
        />
      </div>

      <div className="flex items-center gap-5">
        <input
          type="file"
          id="image"
          onChange={(e) => onChangeImage(e.target.files)}
          className="sr-only"
        />
        <label htmlFor="image" className="group">
          <ImageIcon className="h-6 w-6 stroke-zinc-400 group-hover:stroke-zinc-300" />
        </label>

        <Separator orientation="vertical" className="bg-zinc-700 h-6" />

        <button className="group">
          <Send className="h-6 w-6 stroke-zinc-400 group-hover:stroke-zinc-300" />
        </button>
      </div>
    </form>
  )
}
