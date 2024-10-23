'use client'

import { useEffect, useState } from 'react'
import { getNotificationById, markAsRead } from '@/actions/dashboard/getNotifications'
import { useParams, useRouter } from 'next/navigation'

// تابع تبدیل تاریخ میلادی به شمسی
const convertToShamsi = (miladiDate) => {
  const date = new Date(miladiDate)
  const shamsiDate = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(date)
  return shamsiDate
}

export default function NotificationDetail() {
  const [notification, setNotification] = useState(null)
  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {
    async function fetchNotification() {
      const res = await getNotificationById(id)
      if (res.success) {
        setNotification(res.notification)
      }
    }
    fetchNotification()

    // تغییر وضعیت پیام به خوانده شده
    async function markAsReadNotification() {
      await markAsRead(id)
    }
    markAsReadNotification()
  }, [id])

  if (!notification) {
    return <p>در حال بارگذاری پیام...</p>
  }

  return (
    <div>
      <h1>{notification.title}</h1>
      <p>{notification.message}</p>
      <p>تاریخ: {convertToShamsi(notification.createdAt)}</p> {/* تبدیل تاریخ به شمسی */}
      <button onClick={() => router.push('/Dashboard/Notifications')}>بازگشت</button>
    </div>
  )
}
