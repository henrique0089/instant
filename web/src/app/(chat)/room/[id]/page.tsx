import { redirect } from 'next/navigation'
import { MessageBox } from '../../components/message-box'

interface RoomProps {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Room({ params, searchParams }: RoomProps) {
  if (!params.id) {
    return redirect('/dashboard')
  }

  const memberId = searchParams.m as string

  return <MessageBox memberId={memberId} />
}
