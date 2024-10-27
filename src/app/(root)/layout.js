import { getMenuItems } from '@/actions/admin/menu'
import HeaderSticky from '@/components/layout/Header/HeaderSticky'
import Header from '@/components/layout/Header/Header'
import { auth } from '@/security/auth'
import Footer from '@/components/layout/Footer/Footer'

export default async function RootLayout({ children }) {
  const menuItems = await getMenuItems()

  const session = await auth()

  return (
    <>
      <HeaderSticky menuItems={menuItems} user={session?.user} />
      <Header menuItems={menuItems} user={session?.user} />
      {children}
      <Footer />
    </>
  )
}
