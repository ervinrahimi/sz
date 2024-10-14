// src/app/(root)/dashboard/page.jsx
import { auth } from '@/security/auth'
import styles from './page.module.css'
import Link from 'next/link'

export default async function Dashboard() {
  const session = await auth()
  const user = session?.user

  if (!user) {
    // در صورت عدم ورود کاربر، می‌توانید به صفحه لاگین ریدایرکت کنید
    return null
  }

  return (
    <div className={styles.dashboard}>
      <h1>مدیریت پرداخت ها</h1>
      <div>
        <Link href="../../Dashboard/Payments/Orders">سوابق خرید و سفارشات</Link>
      </div>
      <div>
        <Link href="../../Dashboard/Payments/Installment-Management">مدیریت اقساط</Link>
      </div>
    </div>
  )
}
