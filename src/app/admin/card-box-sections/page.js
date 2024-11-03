// src/app/admin/card-box-sections/page.jsx

import styles from '../page.module.css'
import prisma from '@/db/client'
import CardBoxSectionsList from '@/components/admin/cardBoxSections/CardBoxSectionsList'

export default async function CardBoxSectionsPage() {
  const sections = await prisma.cardBoxSection.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مدیریت بخش کارت باکس ها</h1>
        </div>
        <div className={styles.balanceBox}>
          <h1>مدیریت بخش کارت باکس ها</h1>
          <CardBoxSectionsList sections={sections} />
        </div>
      </div>
    </div>
  )
}
