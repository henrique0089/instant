import { clerkClient } from '@clerk/nextjs'
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

  const memberId = searchParams.m

  const memberDetails = await clerkClient.users.getUser(String(memberId))
  const member = {
    name: memberDetails.firstName,
    email: memberDetails.emailAddresses[0].emailAddress,
    avatar: memberDetails.imageUrl,
  }

  console.log(member)

  return <MessageBox />
}
