import styles from '../../page.module.css'
import prisma from '@/db/client'
import Link from 'next/link'

export default async function CardBoxSectionsPage() {

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مرکز کنترل وبلاگ</h1>
          <Link href="/admin/blog-control-center/article/create" className={styles.button}>
            ساختن مقاله جدید
          </Link>
        </div>
        <div className={styles.balanceBox}>
          مدیریت
        </div>
      </div>
    </div>
  )
}
