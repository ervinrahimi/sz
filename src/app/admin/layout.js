// src/app/admin/layout.jsx

import Sidebar from '@/components/admin/sidebar/Sidebar'
import { ROUTES } from '@/constants/routes'
import { auth } from '@/security/auth'
import { redirect } from 'next/navigation'
import '@/styles/admin.css'

export const metadata = {
  title: 'ادمین پنل',
  description: 'ادمین پنل وبسایت سلطان زاده',
}

export default async function AdminLayout({ children }) {
  const session = await auth()

  // بررسی نقش کاربر
  if (!session || session.user.role !== 1) {
    return await redirect(ROUTES.AUTH.LOGIN)
  }
  
  return (
    <div className={'layout'}>
      <Sidebar admin={session.user} />
      <div className={'content'}>{children}</div>
    </div>
  )
}