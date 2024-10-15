// src/app/(root)/dashboard/page.jsx
import { auth } from '@/security/auth'
import styles from '../page.module.css'
import Link from 'next/link'

export default async function Dashboard() {
  const session = await auth()

  return (
    <div className={styles.container}>
    <div className={styles.mainContent}>
      <div className={styles.header}>
        <h1 className={styles.title}>مدیریت پرداخت ها</h1>
        <div className={styles.buttons}>
          <Link href={'/Dashboard/Payments/Orders'} className={styles.button}>سوابق خرید و سفارشات</Link>
          <Link href={'/Dashboard/Payments/Installment-Management'} className={styles.button}>مدیریت اقساط</Link>
        </div>
      </div>
      <div className={styles.balanceBox}>
        <h2>لطفا از بالا یک فرآیند را انتخاب کنید</h2>
      </div>
    </div>
    </div>
  )
}
