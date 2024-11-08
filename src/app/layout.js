import { yekanBakh, kahroba } from '@/fonts/fonts'
import { getMenuItems } from '@/actions/admin/menu'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import { auth } from '@/security/auth'
import '@/styles/globals.css'

export const metadata = {
  title: 'گروه خودرویی سلطان زاده',
  description: 'وبسایت رسمی مجموعه',
}

export default async function RootLayout({ children }) {
  const menuItems = await getMenuItems()

  const session = await auth()

  // // بررسی نقش کاربر
  // if (!session || session.user.role !== 1) {
  //   return <div className={styles.unauthorized}>دسترسی غیرمجاز</div>
  // }

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
