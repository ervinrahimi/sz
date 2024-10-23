// src/app/(root)/dashboard/page.jsx
import { auth } from '@/security/auth'
import Link from 'next/link'
import styles from '../../page.module.css'
import PurchaseHistory from '@/components/dashboard/PurchaseHistory/PurchaseHistory'

export default async function Dashboard() {
  const session = await auth()

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>سوابق خرید و سفارشات</h1>
          <div className={styles.buttons}>
            <Link href={'/Dashboard/Payments/Installment-Management'} className={styles.button}>
              مدیریت اقساط
            </Link>
          </div>
        </div>
        <div className={styles.balanceBox}>
          <PurchaseHistory />
        </div>
      </div>
    </div>
  )
}
