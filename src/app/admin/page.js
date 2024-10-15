// src/app/admin/page.jsx
import styles from './page.module.css'

export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>داشبورد ادمین</h1>
          {/* <div className={styles.buttons}>
            <Link href={'/'} className={styles.button}>ایجاد</Link>
          </div> */}
        </div>
        <div className={styles.balanceBox}>
          <h2>محتوای داشبورد</h2>
        </div>
      </div>
    </div>
  )
}
