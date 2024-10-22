// src/app/admin/slides/page.jsx

import prisma from '@/db/client'
import SlidesList from '@/components/admin/slides/SlidesList'
import styles from '../page.module.css'
import Link from 'next/link'

export default async function SlidesPage() {
  const slides = await prisma.slide.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مدیریت اسلایدر ها</h1>
          <div className={styles.buttons}>
            <Link href={'/admin/slides/create'} className={styles.button}>
              ساختن اسلاید جدید
            </Link>
          </div>
        </div>
        <div className={styles.balanceBox}>
          <SlidesList slides={slides} />
        </div>
      </div>
    </div>
  )
}
