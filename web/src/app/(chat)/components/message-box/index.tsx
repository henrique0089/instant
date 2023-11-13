import { ScrollArea } from '@/components/ui/scroll-area'
import { clerkClient } from '@clerk/nextjs'
import { AudioMessage } from './audio-message'
import { Header } from './header'
import { ImageMessage } from './image-message'
import { Message } from './message'
import { MessageForm } from './message-form'
import { TextMessageBox } from './text-message'

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

      <ScrollArea className="message-box-h bg-zinc-900 pt-5 px-6 pb-24">
        <div className="space-y-6">
          <Message>
            <TextMessageBox>ajshashajhs</TextMessageBox>
          </Message>
          <Message dir="right">
            <TextMessageBox variant="purple">ajshashajhs</TextMessageBox>
          </Message>
          <Message>
            <TextMessageBox>ajshashajhs</TextMessageBox>
          </Message>
          <Message dir="right">
            <TextMessageBox variant="purple">ajshashajhs</TextMessageBox>
          </Message>
          <Message>
            <ImageMessage src="/food.png" alt="food" />
          </Message>
          <Message dir="right">
            <ImageMessage src="/food.png" alt="food" dir="right" />
          </Message>

          <Message>
            <AudioMessage />
          </Message>

          <Message dir="right">
            <AudioMessage dir="right" />
          </Message>

          <Message dir="right">
            <AudioMessage dir="right" />
          </Message>
        </div>
      </ScrollArea>

      <div className="absolute bottom-3 px-9 w-full">
        <MessageForm />
      </div>
    </div>
  )
}
