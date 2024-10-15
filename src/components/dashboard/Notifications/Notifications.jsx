// src/components/dashboard/Notifications/Notifications.jsx
'use client'

import { useEffect, useState } from 'react'
import styles from './Notifications.module.css'
import { getNotifications } from '@/actions/dashboard/getNotifications'

export default function Notifications() {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    async function fetchNotifications() {
      const res = await getNotifications()
      if (res.success) {
        setNotifications(res.notifications)
      }
    }
    fetchNotifications()
  }, [])

  return (
    <div className={styles.notifications}>
      <h2 className={styles.title}>پیام‌ها و اطلاعیه‌ها</h2>
      {notifications.length > 0 ? (
        <ul className={styles.notificationList}>
          {notifications.map((notif) => (
            <li key={notif.id} className={styles.notificationItem}>
              <h3 className={styles.notificationTitle}>{notif.title}</h3>
              <p className={styles.notificationMessage}>{notif.message}</p>
              <p className={styles.notificationDate}>
                {new Date(notif.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noNotifications}>هیچ پیامی یافت نشد.</p>
      )}
    </div>
  )
}
