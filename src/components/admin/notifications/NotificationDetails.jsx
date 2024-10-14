// src/components/admin/notifications/NotificationDetails.jsx

'use client'

import styles from './NotificationDetails.module.css'

export default function NotificationDetails({ notification }) {
  return (
    <div className={styles.notificationDetails}>
      <p>کد نوتیفیکیشن: {notification.id}</p>
      <p>
        کاربر: {notification.user.name} {notification.user.family}
      </p>
      <p>عنوان پیام: {notification.title}</p>
      <p>متن پیام: {notification.message}</p>
      <p>
        تاریخ ارسال: {new Date(notification.createdAt).toLocaleDateString('fa-IR')}
      </p>
      <p>وضعیت مشاهده: {notification.isRead ? 'خوانده شده' : 'خوانده نشده'}</p>
    </div>
  )
}
