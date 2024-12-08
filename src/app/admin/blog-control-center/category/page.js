// src/app/admin/card-box-sections/page.jsx

import styles from '../../page.module.css'
import prisma from '@/db/client'
import CardBoxSectionsList from '@/components/admin/cardBoxSections/CardBoxSectionsList'
import Link from 'next/link'

export default async function CardBoxSectionsPage() {
  // دریافت بخش‌ها با ترتیب مشخص شده
  const sections = await prisma.cardBoxSection.findMany({
    orderBy: { order: 'asc' }, // مرتب‌سازی بر اساس order
  })

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مرکز کنترل وبلاگ</h1>
          <Link href="/admin/card-box-sections/create" className={styles.button}>
            ایجاد دسته بندی جدید
          </Link>
        </div>
        <div className={styles.balanceBox}>
          دسته بندی ها
        </div>
      </div>
    </div>
  )
}
