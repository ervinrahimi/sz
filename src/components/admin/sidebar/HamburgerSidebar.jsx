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
            <Link onClick={toggleSidebar} href="/admin" className={`${styles.menuItem} ${pathname === '/admin' ? styles.active : ''}`}><Image src="/icons/admin/1.png" alt="Picture of the menu" width={25} height={25}/>داشبورد </Link>
          </li>
          <li> 
            <Link onClick={toggleSidebar} href="/admin/users" className={`${styles.menuItem} ${pathname === '/admin/users' ? styles.active : ''}`}><Image src="/icons/admin/2.png" alt="Picture of the menu" width={25} height={25}/>مدیریت کاربران</Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} href="/admin/menu" className={`${styles.menuItem} ${pathname === '/admin/menu' ? styles.active : ''}`}><Image src="/icons/admin/3.png" alt="Picture of the menu" width={25} height={25}/>مدیریت منو ها</Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} href="/admin/orders" className={`${styles.menuItem} ${pathname === '/admin/orders' ? styles.active : ''}`}><Image src="/icons/admin/4.png" alt="Picture of the menu" width={25} height={25}/>مدیریت سفارش‌ها</Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} href="/admin/vehicles" className={`${styles.menuItem} ${pathname === '/admin/vehicles' ? styles.active : ''}`}><Image src="/icons/admin/5.png" alt="Picture of the menu" width={25} height={25}/>مدیریت خودروها</Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} href="/admin/sales-conditions" className={`${styles.menuItem} ${pathname === '/admin/sales-conditions' ? styles.active : ''}`}><Image src="/icons/admin/6.png" alt="Picture of the menu" width={25} height={25}/>مدیریت شرایط فروش</Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} href="/admin/payments" className={`${styles.menuItem} ${pathname === '/admin/payments' ? styles.active : ''}`}><Image src="/icons/admin/7.png" alt="Picture of the menu" width={25} height={25}/>مدیریت پرداخت‌ها</Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} href="/admin/documents" className={`${styles.menuItem} ${pathname === '/admin/documents' ? styles.active : ''}`}><Image src="/icons/admin/8.png" alt="Picture of the menu" width={25} height={25}/>مدیریت اسناد و مدارک</Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} href="/admin/notifications" className={`${styles.menuItem} ${pathname === '/admin/notifications' ? styles.active : ''}`}><Image src="/icons/admin/9.png" alt="Picture of the menu" width={25} height={25}/>مدیریت پیام‌ها</Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} href="/admin/slides" className={`${styles.menuItem} ${pathname === '/admin/slides' ? styles.active : ''}`}><Image src="/icons/admin/10.png" alt="Picture of the menu" width={25} height={25}/>مدیریت اسلاید ها </Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} href="/admin/carboxes" className={`${styles.menuItem} ${pathname === '/admin/carboxes' ? styles.active : ''}`}><Image src="/icons/admin/12.png" alt="Picture of the menu" width={25} height={25}/>مدیریت کارت باکس ها </Link>
          </li>
          <li>
            <span className={`${styles.menuItem}`} onClick={signOut}><Image src="/icons/admin/11.png" alt="Picture of the menu" width={25} height={25}/>خروج از حساب</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
