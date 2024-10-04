import { SessionProvider } from 'next-auth/react'
import { yekanBakh } from '@/styles/fonts/fonts'
import { auth } from '@/security/auth'
import '@/styles/globals.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${yekanBakh.className}`}>{children}</body>
      </html>
    </SessionProvider>
  )
}
