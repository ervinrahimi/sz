// src/app/admin/layout.jsx

import Sidebar from '@/components/dashboard/Sidebar/Sidebar'
import { ROUTES } from '@/constants/routes'
import { auth } from '@/security/auth'
import { redirect } from 'next/navigation'
import '@/styles/admin.css'

export const metadata = {
  title: 'پنل کاربری',
  description: 'پنل کاربری وبسایت سلطان زاده',
}

export default async function AdminLayout({ children }) {
  const session = await auth()

  // بررسی نقش کاربر
  if (!session || session.user.role === 1) {
    return await redirect(ROUTES.AUTH.LOGIN)
  }

  return (
    <div className={'layout'}>
      <Sidebar />
      <div className={'content'}>{children}</div>
    </div>
  )
}
