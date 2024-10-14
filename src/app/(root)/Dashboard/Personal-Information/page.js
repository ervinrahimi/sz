// src/app/(root)/dashboard/page.jsx
import { auth } from '@/security/auth'
import styles from './page.module.css'
import PersonalInformation from '@/components/dashboard/PersonalInformation/PersonalInformation'

export default async function Dashboard() {
  const session = await auth()
  const user = session?.user

  if (!user) {
    // در صورت عدم ورود کاربر، می‌توانید به صفحه لاگین ریدایرکت کنید
    return null
  }

  return (
    <div className={styles.dashboard}>
      <h1>اطلاعات و ویرایش آن</h1>
      <PersonalInformation user={user} />
    </div>
  )
}
