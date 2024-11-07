// src/app/admin/page.jsx
import prisma from '@/db/client'
import styles from '../page.module.css'
import CardBoxesList from '@/components/admin/cardBoxes/CardBoxesList'
import Link from 'next/link'

export default async function CardBoxesPage() {
  const sections = await prisma.cardBoxSection.findMany({
    include: {
      cardBoxes: {
        include: {
          car: true, // باید به صورت include: { car: true } نوشته شود
        },
      },
    },
    orderBy: { order: 'asc' },
  })  

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مدیریت کارت باکس ها</h1>
          <div className={styles.buttons}>
            <Link href={'/admin/card-boxes/create'} className={styles.button}>
              ساختن کارت باکس جدید
            </Link>
          </div>
        </div>
        <div className={styles.balanceBox}>
          <CardBoxesList sections={sections} />
        </div>
      </div>
    </div>
  )
}
