/* eslint-disable react/no-unescaped-entities */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useAuth } from '@clerk/nextjs'
import { Power } from 'lucide-react'

export function SignoutButton() {
  const { signOut } = useAuth()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="h-10 w-10 rounded-full flex items-center justify-center bg-zinc-800 border border-zinc-700 hover:brightness-90">
          <Power className="h-5 w-5 stroke-purple-700" />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-zinc-950 border-zinc-800">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-zinc-200">
            Are you sure you want to sign out?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-500">
            You'll need to log in again to access your account later.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent text-zinc-200 border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => signOut()}
            className="bg-zinc-800 text-zinc-200 border-0"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
