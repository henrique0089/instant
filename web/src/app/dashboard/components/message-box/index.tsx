import { ScrollArea } from '@/components/ui/scroll-area'
import { AudioMessage } from './audio-message'
import { Header } from './header'
import { ImageMessage } from './image-message'
import { Message } from './message'
import { MessageForm } from './message-form'
import { TextMessageBox } from './text-message'

export function MessageBox() {
  return (
    <div className="flex-1 relative">
      <Header />

      <ScrollArea className="message-box-h bg-zinc-900 pt-5 px-6 pb-[116px]">
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

      <div className="absolute bottom-9 px-9 w-full">
        <MessageForm />
      </div>
    </div>
  )
}
