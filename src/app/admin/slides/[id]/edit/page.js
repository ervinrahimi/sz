// src/app/admin/slides/[id]/edit/page.jsx

import prisma from '@/db/client'
import SlideForm from '@/components/admin/slides/SlideForm'
import styles from '../../page.module.css'

export default async function EditSlidePage({ params }) {
  const slide = await prisma.slide.findUnique({
    where: { id: params.id },
  })

  if (!slide) {
    return <div>اسلاید یافت نشد</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>ویرایش اسلاید</h1>
        </div>
        <div className={styles.balanceBox}>
          <SlideForm slide={slide} />
        </div>
      </div>
    </div>
  )
}
