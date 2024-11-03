// src/app/admin/page.jsx
import prisma from '@/db/client'
import styles from '../page.module.css'
import CardBoxesList from '@/components/admin/cardBoxes/CardBoxesList'

export default async function CardBoxesPage() {
  const cardBoxes = await prisma.cardBox.findMany({
    include: {
      car: true,
      section: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مدیریت کارت باکس ها</h1>
        </div>
        <div className={styles.balanceBox}>
          <h2>محتوای کارت باکس</h2>
          <CardBoxesList cardBoxes={cardBoxes} />
        </div>
      </div>
    </div>
  )
}
