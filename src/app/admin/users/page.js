// src/app/admin/users/page.jsx

import UsersTable from '@/components/admin/users/UsersTable'
import prisma from '@/db/client'
import styles from '../page.module.css'
import Link from 'next/link'

export default async function UsersPage() {
  // دریافت لیست کاربران از دیتابیس
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      family: true,
      email: true,
      phone: true,
      role: true,
      nationalCode: true,
      createdAt: true,
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مدیریت کاربران</h1>
          <div className={styles.buttons}>
            <Link href={'/admin/users/create'} className={styles.button}>
              ایجاد کاربر جدید
            </Link>
          </div>
        </div>
        <div className={styles.balanceBox}>
          <UsersTable users={users} />
        </div>
      </div>
    </div>
  )
}
