// components/ClickableDiv.js
'use client'

import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'
import { SoltanZadeLogoSVG } from '@/assets/svgs/Logos/Logos'
import {
  MenuArrowIcon,
  MenuCartIcon,
  MenuPhoneIcon,
  MenuProfileIcon,
  MenuSearchIcon,
  MenuIcon
} from '@/assets/svgs/Icons/Icons'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function HeaderSticky() {
  const [showContent, setShowContent] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    // تابع برای بررسی عرض صفحه
    const handleResize = () => {
      if (window.innerWidth < 1080) {
        setShowContent(false)
      } else {
        setShowContent(true)
      }
    }

    // بررسی اولیه هنگام بارگذاری صفحه
    handleResize()

    // ثبت رویداد تغییر اندازه صفحه
    window.addEventListener('resize', handleResize)

    // پاکسازی رویداد هنگام خروج کامپوننت
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClick = () => {
    router.replace('/'), { scroll: false }
  }

  const handleShopClick = () => {
    toast('در حال حاضر نمیتوانید این عملیات را انجام دهید')
  }

  const isActive = (path) => {
    return pathname === path
  }

  return (
    <>
      {/* منوی کناری */}
      <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <button className={styles.close} onClick={toggleMenu}>
          ×
        </button>
        <ul>
          <li>
            <Link href={'#'}>سلطان زاده</Link>
          </li>
          <li>
            <Link href={'#'}>محصولات خودرویی</Link>
          </li>
          <li>
            <Link href={'#'}>قطعات یدکی</Link>
          </li>
          <li>
            <Link href={'#'}>نمایندگان و کارشناسان</Link>
          </li>
          <li>
            <Link href={'#'}>همراهی بعد از فروش</Link>
          </li>
          <li>
            <Link href={'#'}>اخبار</Link>
          </li>
          {/* <li>
            <Link href={'#'}>دانلود سنتر</Link>
          </li> */}
          {/* <li>
            <Link href={'#'}>فصل‌نامه</Link>
          </li> */}
        </ul>
      </div>

      <div className={`${styles.stickyContainer} ${isVisible ? styles.visible : styles.hidden}`}>
        <div className={styles.container}>
          <div className={styles.headerMenu}>
            <div className={styles.rightSideMenu}>
              <SoltanZadeLogoSVG onClick={handleClick} className={styles.logo} />
              <ul>
                <li className={isActive('/') ? styles.active : ''}>
                  سلطان زاده
                  <MenuArrowIcon className={isActive('/') ? styles.active : 'menuArrowIcon'} />
                </li>
                <li className={isActive('/shop') ? styles.active : ''}>
                  محصولات خودرویی{' '}
                  <MenuArrowIcon className={isActive('/shop') ? styles.active : 'menuArrowIcon'} />
                </li>
                <li className={isActive('/shop') ? styles.active : ''}>
                  قطعات یدکی{' '}
                  <MenuArrowIcon className={isActive('/shop') ? styles.active : 'menuArrowIcon'} />
                </li>
                <li className={isActive('/representatives') ? styles.active : ''}>
                  نمایندگان و کارشناسان{' '}
                  <MenuArrowIcon className={isActive('/') ? styles.active : 'representatives'} />
                </li>
                <li className={isActive('/after-sales') ? styles.active : ''}>
                  همراهی بعد از فروش{' '}
                  <MenuArrowIcon className={isActive('/') ? styles.active : 'after-sales'} />
                </li>
                <li className={isActive('/news') ? styles.active : ''}>اخبار</li>
                {/* <li className={isActive('/download-center') ? styles.active : ''}>دانلود سنتر</li> */}
                {/* <li className={isActive('/magazine') ? styles.active : ''}>فصل‌نامه</li> */}
              </ul>
            </div>
            <div className={styles.leftSideMenu}>
              <button className={styles.menuButton} onClick={handleShopClick}>
                <MenuSearchIcon />
              </button>
              <button className={styles.menuButton} onClick={handleShopClick}>
                <MenuCartIcon />
              </button>

              <button className={styles.menuButton} onClick={handleShopClick}>
                <MenuProfileIcon />
              </button>
              {!showContent ? (
                <Link href={'https://www.google.com/'} className={styles.menuLinkButton}>
                  <MenuPhoneIcon className={styles.phoneIcon} />
                </Link>
              ) : (
                <Link href={'https://www.google.com/'} className={styles.menuLinkButton}>
                  مشاوره
                  <MenuPhoneIcon className={styles.phoneIcon} />
                </Link>
              )}
              {!showContent ? (
                <button className={styles.menuIconButton} onClick={toggleMenu}>
                  <MenuIcon className={styles.menuIcon} />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
