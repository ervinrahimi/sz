// src/app/admin/card-boxes/[id]/edit/page.jsx

import prisma from '@/db/client'
import CardBoxFormWrapper from '@/components/admin/cardBoxes/CardBoxFormWrapper'
import styles from '../../../page.module.css'

export default async function EditCardBoxPage({ params }) {
  const cardBox = await prisma.cardBox.findUnique({
    where: { id: params.id },
  })

  if (!cardBox) {
    return <div>کارت باکس یافت نشد</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>ویرایش کارت باکس</h1>
        </div>
        <div className={styles.balanceBox}>
          <CardBoxFormWrapper cardBox={cardBox} />
        </div>
      </div>
    </div>
  )
}
