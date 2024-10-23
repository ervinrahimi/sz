import { SessionProvider } from 'next-auth/react'
import { yekanBakh, kahroba, cairo } from '@/fonts/fonts'
import { auth } from '@/security/auth'
import toast, { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'
import GlobalLoading from '@/components/ui/Loading/GlobalLoading'

export const metadata = {
  title: 'گروه خودرویی سلطان زاده',
  description: 'وبسایت رسمی مجموعه',
}

export default async function RootLayout({ children }) {
  const session = await auth()

  // // بررسی نقش کاربر
  // if (!session || session.user.role !== 1) {
  //   return <div className={styles.unauthorized}>دسترسی غیرمجاز</div>
  // }

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${kahroba.variable} ${yekanBakh.variable} ${yekanBakh.cairo}`}>
          <GlobalLoading />
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
