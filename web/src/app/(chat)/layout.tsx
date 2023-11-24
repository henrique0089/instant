import { Inbox } from './components/inbox'
import { BottomMenu } from './components/mobile/bottom-menu'
import { ProfileBox } from './components/profile-box'
import { Sidebar } from './components/sidebar'

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen h-full relative lg:static lg:flex lg:items-start">
      <Sidebar />
      <Inbox />
      {children}
      <ProfileBox />
      <BottomMenu />
    </div>
  )
}
