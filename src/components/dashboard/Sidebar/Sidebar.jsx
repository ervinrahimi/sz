'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.css'

export default function Sidebar({ user }) {
  const pathname = usePathname()

  return (
    <nav className={styles.sidebar}>
      <div className={styles.profile}>
        <img src="/profile-image.png" alt="Profile" className={styles.profileImage} />
        <div className={styles.profileDetails}>
          <h2>{user?.name || 'کاربر'} {user?.family}</h2>
          <p>{user?.email}</p>
        </div>
      </div>
      <ul className={styles.menu}>
        <li>
          <Link href="/Dashboard" className={`${styles.menuItem} ${pathname === '/Dashboard' ? styles.active : ''}`}>داشبورد</Link>
        </li>
        <li>
          <Link href="/Dashboard/Personal-Information" className={`${styles.menuItem} ${pathname.startsWith('/Dashboard/Personal-Information')  ? styles.active : ''}`}>اطلاعات شخصی</Link>
        </li>
        <li>
          <Link href="/Dashboard/Change-Password" className={`${styles.menuItem} ${pathname.startsWith('/Dashboard/Change-Password')  ? styles.active : ''}`}>تغییر رمز عبور</Link>
        </li>
        <li>
          <Link href="/Dashboard/Payments" className={`${styles.menuItem} ${pathname.startsWith('/Dashboard/Payments')  ? styles.active : ''}`}>مدیریت پرداخت ها</Link>
        </li>
        <li>
          <Link href="/Dashboard/Notifications" className={`${styles.menuItem} ${pathname.startsWith('/Dashboard/Notifications')  ? styles.active : ''}`}>اطلاعیه و پیام ها</Link>
        </li>
      </ul>
    </nav>
  )
}
