// src/app/admin/card-box-sections/page.jsx

import styles from '../page.module.css'
import prisma from '@/db/client'
import Link from 'next/link'

export default async function CardBoxSectionsPage() {
  
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مرکز کنترل وبلاگ</h1>
          <Link href="/admin/card-box-sections/create" className={styles.button}>
            ساختن بخش جدید
          </Link>
        </div>
        <div className={styles.balanceBox}>
          مدیریت
        </div>
      </div>
    </div>
  )
}
