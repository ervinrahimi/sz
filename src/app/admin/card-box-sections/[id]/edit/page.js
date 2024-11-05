// src/app/admin/card-box-sections/[id]/edit/page.jsx

import styles from '../../../page.module.css'
import prisma from '@/db/client'
import CardBoxSectionForm from '@/components/admin/cardBoxSections/CardBoxSectionForm'

export default async function EditCardBoxSectionPage({ params }) {
  const section = await prisma.cardBoxSection.findUnique({
    where: { id: params.id },
  })

  if (!section) {
    return <div>بخش یافت نشد</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>ویرایش بخش</h1>
        </div>
        <div className={styles.balanceBox}>
          <CardBoxSectionForm section={section} />
        </div>
      </div>
    </div>
  )
}
