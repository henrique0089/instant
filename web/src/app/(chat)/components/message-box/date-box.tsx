'use client'

import dayjs from 'dayjs'

export function DateBox() {
  const now = dayjs(new Date()).format('MMMM DD, YYYY')

  return <span className="block text-zinc-400">{now}</span>
}
