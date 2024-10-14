// src/app/(root)/dashboard/page.jsx
import { auth } from '@/security/auth'
import styles from './page.module.css'
import PurchaseHistory from '@/components/dashboard/PurchaseHistory/PurchaseHistory'

export default async function Dashboard() {
  const session = await auth()
  const user = session?.user

  if (!user) {
    // در صورت عدم ورود کاربر، می‌توانید به صفحه لاگین ریدایرکت کنید
    return null
  }

  return (
    <div className={styles.dashboard}>
      <h1>سوابق خرید و سفارشات</h1>
      <PurchaseHistory />
    </div>
  )
}
