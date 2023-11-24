import { clerkClient } from '@clerk/nextjs'
import { Header } from './header'
import { MessageForm } from './message-form'
import { MessagesScrollArea } from './messages-scroll-area'

interface MessageBoxProps {
  memberId: string
}

export async function MessageBox({ memberId }: MessageBoxProps) {
  const memberDetails = await clerkClient.users.getUser(String(memberId))
  const member = {
    name: String(memberDetails.firstName),
    avatar: memberDetails.imageUrl,
  }

  return (
    <div className="flex-1 relative">
      <Header member={member} />

      <MessagesScrollArea />

      <div className="absolute bottom-24 lg:bottom-3 px-4 w-full">
        <MessageForm />
      </div>
    </div>
  )
}
