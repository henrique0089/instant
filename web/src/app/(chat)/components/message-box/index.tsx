import { auth, clerkClient } from '@clerk/nextjs'
import { Header } from './header'
import { MessageForm } from './message-form'
import { MessagesScrollArea } from './messages-scroll-area'

interface MessageBoxProps {
  memberId: string
}

export async function MessageBox({ memberId }: MessageBoxProps) {
  const token = await auth().getToken()
  const memberDetails = await clerkClient.users.getUser(String(memberId))
  const member = {
    name: String(memberDetails.firstName),
    avatar: memberDetails.imageUrl,
  }

  return (
    <div className="flex-1 relative">
      <Header member={member} />

      <MessagesScrollArea token={String(token)} />

      <div className="absolute bottom-3 px-9 w-full">
        <MessageForm />
      </div>
    </div>
  )
}
