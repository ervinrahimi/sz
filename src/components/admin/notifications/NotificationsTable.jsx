// src/components/admin/notifications/NotificationsTable.jsx

'use client'

import Link from 'next/link'
import styles from './NotificationsTable.module.css'

export default function NotificationsTable({ notifications }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>کد نوتیفیکیشن</th>
          <th>کاربر</th>
          <th>عنوان پیام</th>
          <th>تاریخ ارسال</th>
          <th>وضعیت مشاهده</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {notifications.map((notif) => (
          <tr key={notif.id}>
            <td>{notif.id}</td>
            <td>
              {notif.user.name} {notif.user.family}
            </td>
            <td>{notif.title}</td>
            <td>{new Date(notif.createdAt).toLocaleDateString('fa-IR')}</td>
            <td>{notif.isRead ? 'خوانده شده' : 'خوانده نشده'}</td>
            <td>
              <Link href={`/admin/notifications/${notif.id}`}>مشاهده</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
