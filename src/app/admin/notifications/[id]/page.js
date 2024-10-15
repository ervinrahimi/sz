// src/app/admin/notifications/[id]/page.jsx

import prisma from '@/db/client'
import styles from '../../page.module.css'
import NotificationDetails from '@/components/admin/notifications/NotificationDetails'

export default async function NotificationDetailsPage({ params }) {
  const notificationId = params.id

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
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>جزئیات نوتیفیکیشن</h1>
        </div>
        <div className={styles.balanceBox}>
          <NotificationDetails notification={notification} />
        </div>
      </div>
    </div>
  )
}
