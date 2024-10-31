// src/app/(root)/dashboard/page.jsx
import { auth } from '@/security/auth'
import styles from '../../page.module.css'
import Link from 'next/link'
import InstallmentManagement from '@/components/dashboard/InstallmentManagement/InstallmentManagement'

export default async function Dashboard() {
  const session = await auth()

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>سوابق خرید و سفارشات</h1>
        </div>
        <div className={styles.balanceBox}>
          <InstallmentManagement />
        </div>
      </div>
    </div>
  )
}
