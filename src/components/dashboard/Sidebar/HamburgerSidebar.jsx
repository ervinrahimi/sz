'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './HamburgerSidebar.module.css'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { SoltanZadeLogoSVG } from '@/assets/svgs/Logos/Logos'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'

export default function HamburgerSidebar({ user }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleToast = () => {
    toast('این امکان به زودی در درسترس قرار میگیرد!')
  }

  return (
    <div className={styles.hamburgerContainer}>
      {/* آیکون همبرگر */}
      <div className={styles.hamburgerIcon}>
          <Image onClick={toggleSidebar} src="/icons/sidebar/menu.png" alt="Picture of the menu" width={45} height={45} />
          <SoltanZadeLogoSVG className={styles.logo} />
      </div>

      {/* سایدبار */}
      <div onClick={toggleSidebar} className={`${styles.sidebarClose} ${isOpen ? styles.open : ''}`}></div>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.profile}>
          <Image
            src="/profile-image.png"
            alt="Profile"
            className={styles.profileImage}
            width={50}
            height={50}
          />
          <div className={styles.profileDetails}>
            <h2>
              {user?.name || 'کاربر'} {user?.family}
            </h2>
            <p>{user?.email}</p>
          </div>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link onClick={toggleSidebar} href="/Dashboard" className={`${styles.menuItem} ${pathname === '/Dashboard' ? styles.active : ''}`}><Image src="/icons/dashboard/1.png" alt="Picture of the menu" width={25} height={25}/>داشبورد</Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} href="/Dashboard/Personal-Information" className={`${styles.menuItem} ${pathname.startsWith('/Dashboard/Personal-Information')  ? styles.active : ''}`}><Image src="/icons/dashboard/2.png" alt="Picture of the menu" width={25} height={25}/>اطلاعات شخصی</Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} href="/Dashboard/Change-Password" className={`${styles.menuItem} ${pathname.startsWith('/Dashboard/Change-Password')  ? styles.active : ''}`}><Image src="/icons/dashboard/3.png" alt="Picture of the menu" width={25} height={25}/>تغییر رمز عبور</Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} href="/Dashboard/Payments" className={`${styles.menuItem} ${pathname.startsWith('/Dashboard/Payments')  ? styles.active : ''}`}><Image src="/icons/dashboard/4.png" alt="Picture of the menu" width={25} height={25}/>مدیریت پرداخت ها</Link>
          </li>
          <li>
            <Link onClick={handleToast} href="#" className={`${styles.menuItem} ${pathname.startsWith('#')  ? styles.active : ''}`}><Image src="/icons/dashboard/5.png" alt="Picture of the menu" width={25} height={25}/>اگهی فروش (بزودی)</Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} href="/Dashboard/Notifications" className={`${styles.menuItem} ${pathname.startsWith('/Dashboard/Notifications')  ? styles.active : ''}`}><Image src="/icons/dashboard/6.png" alt="Picture of the menu" width={25} height={25}/>اطلاعیه و پیام ها</Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} href="/" className={`${styles.menuItem} ${pathname === '/' ? styles.active : ''}`}><Image src="/icons/dashboard/7.png" alt="Picture of the menu" width={25} height={25}/>بازگشت به صفحه اصلی</Link>
          </li>
          <li>
            <span className={`${styles.menuItem}`} onClick={signOut}><Image src="/icons/dashboard/8.png" alt="Picture of the menu" width={25} height={25}/>خروج از حساب</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
