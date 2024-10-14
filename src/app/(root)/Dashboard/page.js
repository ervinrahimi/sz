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
      <h1>پنل کاربری</h1>
      <div>
        <Link href="../Dashboard/Personal-Information">مشاهده اطلاعات شخصی</Link>
      </div>
      <div>
        <Link href="../Dashboard/Change-Password">تغییر رمز عبور</Link>
      </div>
      <div>
        <Link href="../Dashboard/Payments">مدیریت پرداخت ها</Link>
      </div>
      <div>
        <Link href="../Dashboard/Notifications">اطلاعیه ها و پیام ها</Link>
      </div>
    </div>
  )
}
