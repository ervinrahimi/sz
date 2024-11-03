// src/app/admin/card-box-sections/create/page.jsx

import styles from '../../page.module.css'
import CardBoxSectionForm from '@/components/admin/cardBoxSections/CardBoxSectionForm'

export default function CreateCardBoxSectionPage() {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مدیریت بخش کارت باکس ها</h1>
        </div>
        <div className={styles.balanceBox}>
          <h1>ساختن بخش جدید</h1>
          <CardBoxSectionForm />
        </div>
      </div>
    </div>
  )
}
