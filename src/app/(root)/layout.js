import ConditionalHeader from '@/components/layout/Header/ConditionalHeader'
import GlobalLoading from '@/components/ui/Loading/GlobalLoading'
import Footer from '@/components/layout/Footer/Footer'
import { getMenuItems } from '@/actions/admin/menu'
import { auth } from '@/security/auth'

export default async function RootLayout({ children }) {
  const menuItems = await getMenuItems()
  const session = await auth()

  return (
    <>
      {/* <GlobalLoading /> */}
      <ConditionalHeader menuItems={menuItems} user={session?.user} />
      {children}
      <Footer />
    </>
  )
}
