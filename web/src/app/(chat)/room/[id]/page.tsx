import { redirect } from 'next/navigation'
import { MessageBox } from '../../components/message-box'

interface RoomProps {
  params: {
    id: string
  }
}

export default function Room({ params }: RoomProps) {
  if (!params.id) {
    return redirect('/dashboard')
  }

  return <MessageBox />
}
