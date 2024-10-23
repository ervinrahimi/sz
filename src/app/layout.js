import { SessionProvider } from 'next-auth/react'
import { yekanBakh, kahroba, cairo } from '@/fonts/fonts'
import { auth } from '@/security/auth'
import toast, { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'
import GlobalLoading from '@/components/ui/Loading/GlobalLoading'
import { getMenuItems } from '@/actions/admin/menu'
import HeaderSticky from '@/components/layout/Header/HeaderSticky'
import Header from '@/components/layout/Header/Header'

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
          <GlobalLoading />
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'toaster',
            }}
          />
          <HeaderSticky menuItems={menuItems} />
          <Header menuItems={menuItems} />
          {children}
        </body>
      </html>
    </SessionProvider>
  )
}
