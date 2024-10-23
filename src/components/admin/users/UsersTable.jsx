'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation' // اضافه کردن useRouter
import { useEffect } from 'react'
import styles from './UsersTable.module.css'

export default function UsersTable({ users }) {
  const router = useRouter()

  // اضافه کردن useEffect برای رفرش صفحه پس از ریدایرکت
  useEffect(() => {
    // اینجا می‌توانید شرطی اضافه کنید که فقط در مواقع خاص رفرش انجام شود
    router.refresh() // رفرش صفحه
  }, [router])

  const truncateText = (text, length) => {
    if (!text) return
    if (text.length > length) {
      return text.slice(0, length) + '...'
    }
    return text
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.headerCell}>نام</div>
        <div className={styles.headerCell}>نام خانوادگی</div>
        <div className={styles.headerCell}>کد ملی</div>
        <div className={styles.headerCell}>ایمیل</div>
        <div className={styles.headerCell}>شماره تماس</div>
        <div className={styles.headerCell}>نقش</div>
        <div className={styles.headerCell}>عملیات</div>
      </div>
      <div className={styles.body}>
        {users.map((user) => (
          <div key={user.id} className={styles.row}>
            <div className={styles.cell}>{truncateText(user.name, 10)}</div>
            <div className={styles.cell}>{truncateText(user.family, 10)}</div>
            <div className={styles.cell}>{user.nationalCode}</div>
            <div className={`${styles.cell} ${styles.email}`}>{truncateText(user.email, 15)}</div>
            <div className={`${styles.cell} ${styles.phone}`}>{truncateText(user.phone, 15)}</div>
            <div className={styles.cell}>{user.role === 1 ? 'ادمین' : 'کاربر'}</div>
            <div className={styles.cell}>
              <Link href={`/admin/users/${user.id}`} onClick={() => router.refresh()}>
                <button className={styles.button}>مشاهده</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
