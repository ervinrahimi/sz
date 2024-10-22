// src/app/admin/slides/create/page.jsx

import SlideForm from '@/components/admin/slides/SlideForm'
import styles from '../../page.module.css'
import Link from 'next/link'

export default function CreateSlidePage() {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>ساختن اسلاید جدید</h1>
        </div>
        <div className={styles.balanceBox}>
          <SlideForm />
        </div>
      </div>
    </div>
  )
}
