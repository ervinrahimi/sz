// src/app/(root)/dashboard/page.jsx
import { auth } from '@/security/auth'
import styles from '../page.module.css'
import ChangePassword from '@/components/dashboard/ChangePassword/ChangePassword'

export default async function Dashboard() {
  const session = await auth()

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>تغییر رمز عبور</h1>
        </div>
        <div className={styles.balanceBox}>
          <ChangePassword />
        </div>
      </div>
    </div>
  )
}
