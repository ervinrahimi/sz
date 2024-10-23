// src/app/(root)/dashboard/page.jsx
import { auth } from '@/security/auth'
import styles from './page.module.css'
import Link from 'next/link'
import Notifications from '@/components/dashboard/Notifications/Notifications'

export default async function Dashboard() {
  const session = await auth()

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>داشبورد کاربر</h1>
          {/* <div className={styles.buttons}>
            <Link href={'/'} className={styles.button}>ایجاد</Link>
          </div> */}
        </div>
        <div className={styles.balanceBox}>
          <h2>محتوای داشبورد</h2>
          <Notifications />
        </div>
      </div>
    </div>
  )
}
