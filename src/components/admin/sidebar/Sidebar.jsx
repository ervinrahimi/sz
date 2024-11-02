'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.css'
import { signOut } from 'next-auth/react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { useState } from 'react'

export default function Sidebar({ admin }) {
  const pathname = usePathname()
  const [toastCount, setToastCount] = useState(0)
  const [isToastLimited, setIsToastLimited] = useState(false)

  // تابع برای نمایش Toast با محدودیت 5 بار
  const handleToast = () => {
    if (!isToastLimited) {
      if (toastCount < 5) {
        toast('این بخش در حال توسعه است!')
        setToastCount(toastCount + 1)
      }
      if (toastCount + 1 === 5) {
        setIsToastLimited(true)
        setTimeout(() => {
          setToastCount(0)
          setIsToastLimited(false)
        }, 2000) // بعد از ۱۰ ثانیه محدودیت برداشته می‌شود
      }
    }
  }

  return (
    <nav className={styles.sidebar}>
      <div className={styles.profile}>
        <Image
          src="/profile-image.png"
          alt="Profile"
          height={100}
          width={100}
          className={styles.profileImage}
        />
        <div className={styles.profileDetails}>
          <h2>
            {admin?.name || 'ادمین'} {admin?.family}
          </h2>
          <p>{admin?.email}</p>
        </div>
      </div>
      <ul className={styles.menu}>
        <li>
          <Link
            href="/admin"
            className={`${styles.menuItem} ${pathname === '/admin' ? styles.active : ''}`}
          >
            <Image src="/icons/admin/1.png" alt="Picture of the menu" width={25} height={25} />
            داشبورد{' '}
          </Link>
        </li>
        <li>
          <Link
            href="/admin/users"
            className={`${styles.menuItem} ${pathname === '/admin/users' ? styles.active : ''}`}
          >
            <Image src="/icons/admin/2.png" alt="Picture of the menu" width={25} height={25} />
            مدیریت کاربران
          </Link>
        </li>
        <li>
          <Link
            href="/admin/menu"
            className={`${styles.menuItem} ${pathname === '/admin/menu' ? styles.active : ''}`}
          >
            <Image src="/icons/admin/3.png" alt="Picture of the menu" width={25} height={25} />
            مدیریت منو ها
          </Link>
        </li>
        <li>
          <Link
            href="/admin/orders"
            className={`${styles.menuItem} ${pathname === '/admin/orders' ? styles.active : ''}`}
          >
            <Image src="/icons/admin/4.png" alt="Picture of the menu" width={25} height={25} />
            مدیریت سفارش‌ها
          </Link>
        </li>
        <li>
          <Link
            href="/admin/vehicles"
            className={`${styles.menuItem} ${pathname === '/admin/vehicles' ? styles.active : ''}`}
          >
            <Image src="/icons/admin/5.png" alt="Picture of the menu" width={25} height={25} />
            مدیریت خودروها
          </Link>
        </li>
        <li>
          <Link
            href="/admin/sales-conditions"
            className={`${styles.menuItem} ${
              pathname === '/admin/sales-conditions' ? styles.active : ''
            }`}
          >
            <Image src="/icons/admin/6.png" alt="Picture of the menu" width={25} height={25} />
            مدیریت شرایط فروش
          </Link>
        </li>
        <li>
          <Link
            href="/admin/payments"
            className={`${styles.menuItem} ${pathname === '/admin/payments' ? styles.active : ''}`}
          >
            <Image src="/icons/admin/7.png" alt="Picture of the menu" width={25} height={25} />
            مدیریت پرداخت‌ها
          </Link>
        </li>
        <li>
          <Link
            href="/admin/documents"
            className={`${styles.menuItem} ${pathname === '/admin/documents' ? styles.active : ''}`}
          >
            <Image src="/icons/admin/8.png" alt="Picture of the menu" width={25} height={25} />
            مدیریت اسناد و مدارک
          </Link>
        </li>
        <li>
          <Link
            href="/admin/notifications"
            className={`${styles.menuItem} ${
              pathname === '/admin/notifications' ? styles.active : ''
            }`}
          >
            <Image src="/icons/admin/9.png" alt="Picture of the menu" width={25} height={25} />
            مدیریت پیام‌ها
          </Link>
        </li>
        <li>
          <Link
            href="/admin/slides"
            className={`${styles.menuItem} ${pathname === '/admin/slides' ? styles.active : ''}`}
          >
            <Image src="/icons/admin/10.png" alt="Picture of the menu" width={25} height={25} />
            مدیریت اسلاید ها{' '}
          </Link>
        </li>
        {/* اضافه کردن توست به مدیریت کارت باکس ها */}
        <li>
          <Link
            href="/admin/card-boxes/"
            className={`${styles.menuItem} ${pathname === '/admin/carboxes' ? styles.active : ''}`}
          >
            <Image src="/icons/admin/12.png" alt="Picture of the menu" width={25} height={25} />
            مدیریت کارت باکس ها{' '}
          </Link>
        </li>
        <li>
          <span className={`${styles.menuItem}`} onClick={signOut}>
            <Image src="/icons/admin/11.png" alt="Picture of the menu" width={25} height={25} />
            خروج از حساب
          </span>
        </li>
      </ul>
    </nav>
  )
}
