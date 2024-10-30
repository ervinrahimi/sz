'use client'

import { useEffect, useState } from 'react'
import styles from './Notifications.module.css'
import { getNotifications } from '@/actions/dashboard/getNotifications'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// تابع تبدیل تاریخ میلادی به تاریخ شمسی (محاسبات دستی)
const convertToShamsi = (miladiDate) => {
  const date = new Date(miladiDate)
  const shamsiDate = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(date)
  return shamsiDate
}

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function fetchNotifications() {
      const res = await getNotifications()
      if (res.success) {
        setNotifications(res.notifications)
        router.refresh()
      }
    }
    fetchNotifications()
  }, [])

  return (
    <div className={styles.notifications}>
      <h2 className={styles.title}>پیام‌ها و اطلاعیه‌ها</h2>
      {notifications.length > 0 ? (
        <div>
          {/* پیام‌های نخوانده */}
          <h3>پیام‌های نخوانده</h3>
          <ul className={styles.notificationList}>
            {notifications
              .filter((notif) => !notif.isRead)
              .map((notif) => (
                <li key={notif.id} className={styles.notificationItem}>
                  <h3 className={styles.notificationTitle}>{notif.title}</h3>
                  <p className={styles.notificationMessage}>{notif.message}</p>
                  <p className={styles.notificationDate}>{convertToShamsi(notif.createdAt)}</p>
                  <Link href={`/Dashboard/Notifications/${notif.id}`}>
                    <button className={styles.readButton}>مشاهده</button>
                  </Link>
                </li>
              ))}
          </ul>

          {/* پیام‌های خوانده شده */}
          <h3>پیام‌های خوانده شده</h3>
          <ul className={styles.notificationList}>
            {notifications
              .filter((notif) => notif.isRead)
              .map((notif) => (
                <li key={notif.id} className={styles.notificationItem}>
                  <h3 className={styles.notificationTitle}>{notif.title}</h3>
                  <p className={styles.notificationMessage}>{notif.message}</p>
                  <p className={styles.notificationDate}>{convertToShamsi(notif.createdAt)}</p>
                  <Link href={`/Dashboard/Notifications/${notif.id}`}>
                    <button className={styles.readButton}>مشاهده</button>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <p className={styles.noNotifications}>هیچ پیامی یافت نشد.</p>
      )}
    </div>
  )
}
