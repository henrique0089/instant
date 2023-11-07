import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import './globals.css'

const lexend = Lexend({ subsets: ['latin'], weight: ['400', '500', '600'] })

export const metadata: Metadata = {
  title: 'Instant',
  description: 'Message App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          card: 'rounded-xl bg-zinc-950 border border-zinc-800 bg-card text-card-foreground shadow-none p-6',
          headerTitle: 'text-zinc-200',
          headerSubtitle: 'text-zinc-500',
          socialButtonsBlockButton:
            'border border-zinc-800 hover:border-zinc-500 text-zinc-500 hover:text-zinc-200',
          socialButtonsBlockButtonArrow: 'stroke-zinc-500',
          dividerLine: 'bg-zinc-800',
          dividerText: 'text-zinc-500',
          formFieldLabelRow: 'mb-2',
          formFieldLabel:
            'text-sm leading-none text-zinc-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          formFieldInput:
            'rounded-md px-3 bg-transparent border-zinc-800 text-zinc-200 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-zinc-500 transition-colors',
          formButtonPrimary:
            'bg-zinc-900 hover:bg-zinc-800 transition-all text-zinc-100',
          footerActionText: 'text-zinc-500',
          footerActionLink: 'text-zinc-200 hover:text-zinc-200',
        },
      }}
    >
      <html lang="en">
        <body className={lexend.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
