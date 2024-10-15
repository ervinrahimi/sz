// src/app/admin/users/[id]/page.jsx

import styles from '../../page.module.css'
import UserCreate from '@/components/admin/users/UserCreate'

export default async function UserCreatePage() {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>ایجاد کاربر جدید</h1>
        </div>
        <div className={styles.balanceBox}>
          <UserCreate />
        </div>
      </div>
    </div>
  )
}
