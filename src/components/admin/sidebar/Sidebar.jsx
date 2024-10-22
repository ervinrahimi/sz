// src/components/admin/sidebar/Sidebar.jsx

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.css'
import { signOut } from 'next-auth/react'

export default function Sidebar({ admin }) {
  const pathname = usePathname()

  return (
    <nav className={styles.sidebar}>
      <div className={styles.profile}>
        <img src="/profile-image.png" alt="Profile" className={styles.profileImage} />
        <div className={styles.profileDetails}>
          <h2>{admin?.name || 'ادمین'} {admin?.family}</h2>
          <p>{admin?.email}</p>
        </div>
      </div>
      <ul className={styles.menu}>
        <li>
          <Link href="/admin" className={`${styles.menuItem} ${pathname === '/admin' ? styles.active : ''}`}>داشبورد</Link>
        </li>
        <li>
          <Link href="/admin/users" className={`${styles.menuItem} ${pathname === '/admin/users' ? styles.active : ''}`}>مدیریت کاربران</Link>
        </li>
        <li>
          <Link href="/admin/menu" className={`${styles.menuItem} ${pathname === '/admin/menu' ? styles.active : ''}`}>مدیریت منو ها</Link>
        </li>
        <li>
          <Link href="/admin/orders" className={`${styles.menuItem} ${pathname === '/admin/orders' ? styles.active : ''}`}>مدیریت سفارش‌ها</Link>
        </li>
        <li>
          <Link href="/admin/vehicles" className={`${styles.menuItem} ${pathname === '/admin/vehicles' ? styles.active : ''}`}>مدیریت خودروها</Link>
        </li>
        <li>
          <Link href="/admin/sales-conditions" className={`${styles.menuItem} ${pathname === '/admin/sales-conditions' ? styles.active : ''}`}>مدیریت شرایط فروش</Link>
        </li>
        <li>
          <Link href="/admin/payments" className={`${styles.menuItem} ${pathname === '/admin/payments' ? styles.active : ''}`}>مدیریت پرداخت‌ها</Link>
        </li>
        <li>
          <Link href="/admin/documents" className={`${styles.menuItem} ${pathname === '/admin/documents' ? styles.active : ''}`}>مدیریت اسناد و مدارک</Link>
        </li>
        <li>
          <Link href="/admin/notifications" className={`${styles.menuItem} ${pathname === '/admin/notifications' ? styles.active : ''}`}>مدیریت نوتیفیکیشن‌ها و پیام‌ها</Link>
        </li>
        <li>
          <span className={`${styles.menuItem}`} onClick={signOut}>خروج از حساب</span>
        </li>
      </ul>
    </nav>
  )
}
