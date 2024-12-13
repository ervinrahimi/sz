'use client'

import Header from '@/components/layout/Header/Header'
import { usePathname } from 'next/navigation'

export default function ConditionalHeader({ menuItems, user }) {
  const pathname = usePathname()

  // بررسی اگر مسیر در صفحات اصلی است یا از صفحات مرتبط با "/cars" است
  const isMainHeader = pathname === '/' || pathname.startsWith('/cars') 

  return (
    <>
      {isMainHeader ? (
        <>
          <Header menuItems={menuItems} user={user} />
        </>
      ) : (
        <Header otherPages={true} user={user} />
      )}
    </>
  )
}
