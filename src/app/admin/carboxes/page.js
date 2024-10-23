// src/app/admin/page.jsx
import styles from '../page.module.css'

export default function CarboxesPage() {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مدیریت کارت باکس ها</h1>
          {/* <div className={styles.buttons}>
            <Link href={'/'} className={styles.button}>ایجاد</Link>
          </div> */}
        </div>
        <div className={styles.balanceBox}>
          <h2>محتوای کارت باکس</h2>
        </div>
      </div>
    </div>
  )
}
