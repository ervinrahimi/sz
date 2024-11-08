import HeaderSticky from '@/components/layout/Header/HeaderSticky'
import GlobalLoading from '@/components/ui/Loading/GlobalLoading'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import { getMenuItems } from '@/actions/admin/menu'
import { auth } from '@/security/auth'

export default async function RootLayout({ children }) {
  const menuItems = await getMenuItems()

  const session = await auth()

  return (
    <>
      <GlobalLoading />
      <HeaderSticky menuItems={menuItems} user={session?.user} />
      <Header menuItems={menuItems} user={session?.user} />
      {children}
      <Footer />
    </>
  )
}
