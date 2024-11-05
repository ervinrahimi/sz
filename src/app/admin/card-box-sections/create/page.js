// src/app/admin/card-box-sections/create/page.jsx

import styles from '../../page.module.css'
import CardBoxSectionForm from '@/components/admin/cardBoxSections/CardBoxSectionForm'

export default function CreateCardBoxSectionPage() {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>ساختن بخش جدید</h1>
        </div>
        <div className={styles.balanceBox}>
          <CardBoxSectionForm />
        </div>
      </div>
    </div>
  )
}
