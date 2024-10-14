// src/app/admin/notifications/page.jsx

import prisma from '@/db/client'
import NotificationsTable from '@/components/admin/notifications/NotificationsTable'

export default async function NotificationsPage() {
  const notifications = await prisma.notification.findMany({
    include: {
      user: true,
    },
  })

  return (
    <div>
      <h1>مدیریت نوتیفیکیشن‌ها و پیام‌ها</h1>
      <NotificationsTable notifications={notifications} />
    </div>
  )
}
