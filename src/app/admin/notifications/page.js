// src/app/admin/notifications/page.jsx

import prisma from '@/db/client'
import NotificationsTable from '@/components/admin/notifications/NotificationsTable'
import Link from 'next/link'
import styles from '../page.module.css'

export default async function NotificationsPage() {
  const notifications = await prisma.notification.findMany({
    include: {
      user: true,
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>داشبورد ادمین</h1>
          <div className={styles.buttons}>
            <Link href={'/admin/notifications/new'} className={styles.button}>
              ارسال نوتیفیکشن
            </Link>
          </div>
        </div>
        <div className={styles.balanceBox}>
          <NotificationsTable notifications={notifications} />
        </div>
      </div>
    </div>
  )
}
