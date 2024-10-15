// src/app/admin/notifications/new/page.jsx

import styles from '../../page.module.css'
import SendNotificationForm from '@/components/admin/notifications/SendNotificationForm/SendNotificationForm'

export default function NewNotificationPage() {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>ارسال نوتیفیکیشن جدید</h1>
        </div>
        <div className={styles.balanceBox}>
          <SendNotificationForm />
        </div>
      </div>
    </div>
  )
}
