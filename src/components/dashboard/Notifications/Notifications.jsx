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
      <h2>پیام‌ها و اطلاعیه‌ها</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notif) => (
            <li key={notif.id}>
              <h3>{notif.title}</h3>
              <p>{notif.message}</p>
              <p>{new Date(notif.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>هیچ پیامی یافت نشد.</p>
      )}
    </div>
  )
}
