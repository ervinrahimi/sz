// src/app/admin/notifications/[id]/page.jsx

import prisma  from '@/db/client'
import NotificationDetails from '@/components/admin/notifications/NotificationDetails'

export default async function NotificationDetailsPage({ params }) {
  const notificationId = params.id

  // اطمینان از وجود id
  if (!notificationId) {
    return <div>نوتیفیکیشن یافت نشد</div>
  }

  // جستجوی نوتیفیکیشن بر اساس id
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
    include: {
      user: true,
    },
  })

  if (!notification) {
    return <div>نوتیفیکیشن یافت نشد</div>
  }

  return (
    <div>
      <h1>جزئیات نوتیفیکیشن</h1>
      <NotificationDetails notification={notification} />
    </div>
  )
}
