// src/components/admin/sidebar/Sidebar.jsx

'use client'

import Link from 'next/link'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <ul>
        <li>
          <Link href="/admin">داشبورد</Link>
        </li>
        <li>
          <Link href="/admin/users">مدیریت کاربران</Link>
        </li>
        <li>
          <Link href="/admin/orders">مدیریت سفارش‌ها</Link>
        </li>
        <li>
          <Link href="/admin/vehicles">مدیریت خودروها</Link>
        </li>
        <li>
          <Link href="/admin/sales-conditions">مدیریت شرایط فروش</Link>
        </li>
        <li>
          <Link href="/admin/payments">مدیریت پرداخت‌ها</Link>
        </li>
        <li>
          <Link href="/admin/documents">مدیریت اسناد و مدارک</Link>
        </li>
        <li>
          <Link href="/admin/notifications">مدیریت نوتیفیکیشن‌ها و پیام‌ها</Link>
        </li>
      </ul>
    </nav>
  )
}
