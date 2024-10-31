'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.css'
import { signOut } from 'next-auth/react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { useState } from 'react'

export default function Sidebar({ user }) {
  const pathname = usePathname()
  const [toastCount, setToastCount] = useState(0)
  const [isToastLimited, setIsToastLimited] = useState(false)
  const [isPaymentsSubmenuOpen, setPaymentsSubmenuOpen] = useState(false)

  const handleToast = () => {
    if (!isToastLimited) {
      if (toastCount < 5) {
        toast('این امکان به زودی در دسترس قرار می‌گیرد!')
        setToastCount(toastCount + 1)
      }
      if (toastCount + 1 === 5) {
        setIsToastLimited(true)
        setTimeout(() => {
          setToastCount(0)
          setIsToastLimited(false)
        }, 5000)
      }
    }
  }

  return (
    <nav className={styles.sidebar}>
      <div className={styles.profile}>
        <Image
          src="/profile-image.png"
          alt="Profile"
          className={styles.profileImage}
          width={100}
          height={100}
        />
        <div className={styles.profileDetails}>
          <h2>{user?.name || 'کاربر'} {user?.family}</h2>
          <p>{user?.email}</p>
        </div>
      </div>
      <ul className={styles.menu}>
        <li>
          <Link
            href="/Dashboard"
            className={`${styles.menuItem} ${pathname === '/Dashboard' ? styles.active : ''}`}
          >
            <Image src="/icons/dashboard/1.png" alt="Menu Icon" width={25} height={25} />
            داشبورد
          </Link>
        </li>
        <li>
          <Link
            href="/Dashboard/Personal-Information"
            className={`${styles.menuItem} ${pathname.startsWith('/Dashboard/Personal-Information') ? styles.active : ''}`}
          >
            <Image src="/icons/dashboard/2.png" alt="Menu Icon" width={25} height={25} />
            اطلاعات شخصی
          </Link>
        </li>
        <li>
          <Link
            href="/Dashboard/Change-Password"
            className={`${styles.menuItem} ${pathname.startsWith('/Dashboard/Change-Password') ? styles.active : ''}`}
          >
            <Image src="/icons/dashboard/3.png" alt="Menu Icon" width={25} height={25} />
            تغییر رمز عبور
          </Link>
        </li>
        <li>
          <div
            onClick={() => setPaymentsSubmenuOpen(!isPaymentsSubmenuOpen)}
            className={`${styles.menuItem} ${styles.submenuToggle}`}
          >
            <Image src="/icons/dashboard/4.png" alt="Menu Icon" width={25} height={25} />
            مدیریت پرداخت‌ها
            <span className={styles.submenuIcon}>
              {isPaymentsSubmenuOpen ? <Image src="/icons/dashboard/arrow-up.png" alt="Menu Icon" width={25} height={25} /> : <Image src="/icons/dashboard/arrow-down.png" alt="Menu Icon" width={25} height={25} />}
            </span>
          </div>
          {isPaymentsSubmenuOpen && (
            <ul className={styles.submenu}>
              <li className={`${styles.submenuItem} ${pathname.startsWith('/Dashboard/Payments/Installment-Management') ? styles.activeSubmenu : ''}`}>
                <Image src="/icons/dashboard/sunMenu-arrow-left.png" alt="Menu Icon" width={20} height={20} />
                <Link href="/Dashboard/Payments/Installment-Management">
                  اقساط
                </Link>
              </li>
              <li onClick={handleToast} className={`${styles.submenuItem} ${pathname.startsWith('/Dashboard/Payments/test') ? styles.activeSubmenu : ''}`}>
                <Image src="/icons/dashboard/sunMenu-arrow-left.png" alt="Menu Icon" width={20} height={20} />
                <Link href="#">
                  ودیعه‌ها
                </Link>
                
              </li>
              <li className={`${styles.submenuItem} ${pathname.startsWith('/Dashboard/Payments/Orders') ? styles.activeSubmenu : ''}`}>
                <Image src="/icons/dashboard/sunMenu-arrow-left.png" alt="Menu Icon" width={20} height={20} />
                <Link href="/Dashboard/Payments/Orders">
                سوابق خرید
                </Link>
              </li>
              <li  onClick={handleToast} className={`${styles.submenuItem} ${pathname.startsWith('/Dashboard/Payments/test') ? styles.activeSubmenu : ''}`}>
                <Image src="/icons/dashboard/sunMenu-arrow-left.png" alt="Menu Icon" width={20} height={20} />
                <Link href="#">
                مدیریت پرداخت‌های آینده
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link onClick={handleToast} href="#" className={`${styles.menuItem} ${pathname.startsWith('#') ? styles.active : ''}`}>
            <Image src="/icons/dashboard/5.png" alt="Menu Icon" width={25} height={25} />
            اگهی فروش (بزودی)
          </Link>
        </li>
        <li>
          <Link href="/Dashboard/Notifications" className={`${styles.menuItem} ${pathname.startsWith('/Dashboard/Notifications') ? styles.active : ''}`}>
            <Image src="/icons/dashboard/6.png" alt="Menu Icon" width={25} height={25} />
            اطلاعیه و پیام‌ها
          </Link>
        </li>
        <li>
          <Link href="/" className={`${styles.menuItem} ${pathname === '/' ? styles.active : ''}`}>
            <Image src="/icons/dashboard/7.png" alt="Menu Icon" width={25} height={25} />
            بازگشت به صفحه اصلی
          </Link>
        </li>
        <li>
          <span className={`${styles.menuItem}`} onClick={signOut}>
            <Image src="/icons/dashboard/8.png" alt="Menu Icon" width={25} height={25} />
            خروج از حساب
          </span>
        </li>
      </ul>
    </nav>
  )
}
