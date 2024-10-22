'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.css'
import { signOut } from 'next-auth/react'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function Sidebar({ user }) {
  const pathname = usePathname()

  const handleToast = () => {
    toast('این امکان به زودی در درسترس قرار میگیرد!')
  }

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
          <Link href="/Dashboard" className={`${styles.menuItem} ${pathname === '/Dashboard' ? styles.active : ''}`}><Image src="/icons/dashboard/1.png" alt="Picture of the menu" width={25} height={25}/>داشبورد</Link>
        </li>
        <li>
          <Link href="/Dashboard/Personal-Information" className={`${styles.menuItem} ${pathname.startsWith('/Dashboard/Personal-Information')  ? styles.active : ''}`}><Image src="/icons/dashboard/2.png" alt="Picture of the menu" width={25} height={25}/>اطلاعات شخصی</Link>
        </li>
        <li>
          <Link href="/Dashboard/Change-Password" className={`${styles.menuItem} ${pathname.startsWith('/Dashboard/Change-Password')  ? styles.active : ''}`}><Image src="/icons/dashboard/3.png" alt="Picture of the menu" width={25} height={25}/>تغییر رمز عبور</Link>
        </li>
        <li>
          <Link href="/Dashboard/Payments" className={`${styles.menuItem} ${pathname.startsWith('/Dashboard/Payments')  ? styles.active : ''}`}><Image src="/icons/dashboard/4.png" alt="Picture of the menu" width={25} height={25}/>مدیریت پرداخت ها</Link>
        </li>
        <li>
          <Link onClick={handleToast} href="#" className={`${styles.menuItem} ${pathname.startsWith('#')  ? styles.active : ''}`}><Image src="/icons/dashboard/5.png" alt="Picture of the menu" width={25} height={25}/>اگهی فروش (بزودی)</Link>
        </li>
        <li>
          <Link href="/Dashboard/Notifications" className={`${styles.menuItem} ${pathname.startsWith('/Dashboard/Notifications')  ? styles.active : ''}`}><Image src="/icons/dashboard/6.png" alt="Picture of the menu" width={25} height={25}/>اطلاعیه و پیام ها</Link>
        </li>
        <li>
          <Link href="/" className={`${styles.menuItem} ${pathname === '/' ? styles.active : ''}`}><Image src="/icons/dashboard/7.png" alt="Picture of the menu" width={25} height={25}/>بازگشت به صفحه اصلی</Link>
        </li>
        <li>
          <span className={`${styles.menuItem}`} onClick={signOut}><Image src="/icons/dashboard/8.png" alt="Picture of the menu" width={25} height={25}/>خروج از حساب</span>
        </li>
      </ul>
    </nav>
  )
}
