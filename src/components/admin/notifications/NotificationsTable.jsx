// src/components/admin/notifications/NotificationsTable.jsx

'use client'

import Link from 'next/link'
import styles from './NotificationsTable.module.css'

export default function NotificationsTable({ notifications }) {
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.headerCell}>کد نوتیفیکیشن</div>
        <div className={styles.headerCell}>کاربر</div>
        <div className={styles.headerCell}>عنوان پیام</div>
        <div className={styles.headerCell}>تاریخ ارسال</div>
        <div className={styles.headerCell}>وضعیت مشاهده</div>
        <div className={styles.headerCell}>عملیات</div>
      </div>
      <div className={styles.body}>
        {notifications.map((notif) => (
          <div key={notif.id} className={styles.row}>
            <div className={styles.cell}>{notif.id}</div>
            <div className={styles.cell}>
              {notif.user.name} {notif.user.family}
            </div>
            <div className={styles.cell}>{notif.title}</div>
            <div className={styles.cell}>
              {new Date(notif.createdAt).toLocaleDateString('fa-IR')}
            </div>
            <div className={styles.cell}>
              {notif.isRead ? 'خوانده شده' : 'خوانده نشده'}
            </div>
            <div className={styles.cell}>
              <Link href={`/admin/notifications/${notif.id}`}>
                <button className={styles.button}>مشاهده</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
