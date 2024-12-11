import ConditionalHeader from '@/components/layout/Header/ConditionalHeader'
import GlobalLoading from '@/components/ui/Loading/GlobalLoading'
import { getMenuItems } from '@/actions/admin/menu'
import { auth } from '@/security/auth'
import LegalContact from '@/components/layout/tfooter/legal-contact'
import Footer from '@/components/layout/tfooter/footer'
import SecondaryFooter from '@/components/layout/tfooter/secondary-footer'
import Subscribe from '@/components/ui/tblog/Subscribe'

export default async function RootLayout({ children }) {
  const menuItems = await getMenuItems()
  const session = await auth()

  return (
    <>
      {/* <GlobalLoading /> */}
      <ConditionalHeader menuItems={menuItems} user={session?.user} />
      {children}
      {/* <Footer /> */}
      <LegalContact />
      <Subscribe />
      <Footer />
      <SecondaryFooter />
    </>
  )
}
