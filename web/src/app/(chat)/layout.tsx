import { Inbox } from './components/inbox'
import { ProfileBox } from './components/profile-box'
import { Sidebar } from './components/sidebar'

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen h-full flex items-start">
      <Sidebar />
      <Inbox />
      {children}
      <ProfileBox />
    </div>
  )
}
