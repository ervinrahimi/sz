// src/app/(root)/dashboard/page.jsx
import { auth } from '@/security/auth'
import styles from './page.module.css'
import InstallmentManagement from '@/components/dashboard/InstallmentManagement/InstallmentManagement'

export default async function Dashboard() {
  const session = await auth()
  const user = session?.user

  if (!user) {
    // در صورت عدم ورود کاربر، می‌توانید به صفحه لاگین ریدایرکت کنید
    return null
  }

  return (
    <div className={styles.dashboard}>
      <h1>مدیریت اقساط</h1>
      <InstallmentManagement />
    </div>
  )
}
