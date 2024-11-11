import { yekanBakh, kahroba } from '@/fonts/fonts'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import { auth } from '@/security/auth'
import '@/styles/globals.css'

export const metadata = {
  title: 'گروه خودرویی سلطان زاده',
  description: 'وبسایت رسمی مجموعه',
}

export default async function RootLayout({ children }) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${kahroba.variable} ${yekanBakh.variable} ${yekanBakh.cairo}`}>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'toaster',
            }}
          />
          {children}
        </body>
      </html>
    </SessionProvider>
  )
}
