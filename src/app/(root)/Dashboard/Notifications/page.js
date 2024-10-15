// src/app/(root)/dashboard/page.jsx
import { auth } from '@/security/auth'
import styles from '../page.module.css'
import Notifications from '@/components/dashboard/Notifications/Notifications'

export default async function Dashboard() {
  const session = await auth()

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>پیام ها و اطلاعیه ها</h1>
        </div>
        <div className={styles.balanceBox}>
          <Notifications />
        </div>
      </div>
    </div>
  )
}
