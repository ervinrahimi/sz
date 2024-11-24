'use client'

import HeaderSticky from '@/components/layout/Header/HeaderSticky'
import Header from '@/components/layout/Header/Header'
import { usePathname } from 'next/navigation'
import MainHeader from '@/components/layout/Header/MainHeader'

export default function ConditionalHeader({ menuItems, user }) {
  const pathname = usePathname()

  // بررسی اگر مسیر در صفحات اصلی است یا از صفحات مرتبط با "/cars" است
  const isMainHeader = pathname === '/' || pathname.startsWith('/cars')

  return (
    <>
      {isMainHeader ? (
        <>
          <HeaderSticky menuItems={menuItems} user={user} />
          <Header menuItems={menuItems} user={user} />
        </>
      ) : (
        <MainHeader menuItems={menuItems} user={user} />
      )}
    </>
  )
}
