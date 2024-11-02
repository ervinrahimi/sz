// src/app/admin/card-boxes/create/page.jsx
import styles from '../../page.module.css'
import CardBoxFormWrapper from '@/components/admin/cardBoxes/CardBoxFormWrapper'

export default function CreateCardBoxPage() {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>ساختن کارت باکس جدید</h1>
        </div>
        <div className={styles.balanceBox}>
          <CardBoxFormWrapper />
        </div>
      </div>
    </div>
  )
}
