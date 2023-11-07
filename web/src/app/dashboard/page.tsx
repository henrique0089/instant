import { Inbox } from './components/inbox'
import { MessageBox } from './components/message-box'
import { ProfileBox } from './components/profile-box'
import { Sidebar } from './components/sidebar'

export default function Dashboard() {
  return (
    <div className="min-h-screen h-full flex items-start">
      <Sidebar />
      <Inbox />
      <MessageBox />
      <ProfileBox />
    </div>
  )
}
