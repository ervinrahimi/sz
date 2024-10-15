import Link from 'next/link'
import styles from './Sidebar.module.css'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.menu}>
        <li>
          <Link href="/Dashboard" className={styles.menuItem}>
            <span className={styles.icon}>🏠</span>داشبورد
          </Link>
        </li>
        <li>
          <Link href="../Dashboard/Personal-Information" className={styles.menuItem}>
            <span className={styles.icon}>📊</span> اطلاعات شخصی
          </Link>
        </li>
        <li>
          <Link href="../Dashboard/Change-Password" className={styles.menuItem}>
            <span className={styles.icon}>➕</span> تغییر رمز عبور
          </Link>
        </li>
        <li>
          <Link href="../Dashboard/Payments" className={styles.menuItem}>
            <span className={styles.icon}>💼</span> مدیریت پرداخت ها
          </Link>
        </li>
        <li>
          <Link href="../Dashboard/Notifications" className={styles.menuItem}>
            <span className={styles.icon}>👤</span> اطلاعیه و پیام ها
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
