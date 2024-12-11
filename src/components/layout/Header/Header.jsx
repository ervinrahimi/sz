'use client' // برای استفاده از usePathname در App Router ضروری است

import {
  RiShoppingCart2Line,
  RiUser3Line,
  RiCustomerService2Line,
  RiMenu3Line,
  RiCloseLine,
} from 'react-icons/ri'
import React, { useState, useEffect } from 'react'
import styles from './Header.module.css'
import TopHeader from './TopHeader'
import { SoltanZadeLogoSVG } from '@/assets/svgs/Logos/Logos'
import { usePathname } from 'next/navigation'

export default function Header({otherPages}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const pathname = usePathname() // مسیر فعلی را دریافت می‌کند

  const navItems = [
    ['خانه', '/'],
    ['قطعات یدکی', '/spare-parts'],
    ['وبلاگ', '/blog'],
    ['شعب', '/branches'],
    ['طرح های فروش', '/sales-plan'],
    ['کارشناسان', '/experts'],
    ['همراهی بعد از فروش', '/support-after-sale'],
    ['استخدام', '/employment'],
    ['همراهان', '/companions']
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setIsAnimating(true)
  }

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  return (
    <header className={otherPages ? styles.headerWrapperP :  styles.headerWrapper}>
      <TopHeader />
      <div className={`${styles.mainHeader} ${styles.sticky}`}>
        <div className={styles.logoNav}>
          <div className={styles.logo}>
            <SoltanZadeLogoSVG />
          </div>
          <nav className={styles.desktopNav}>
            {navItems.map((item, index) => {
              const isActive = pathname === item[1]
              return (
                <React.Fragment key={index}>
                  <a
                    href={item[1]}
                    className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                  >
                    {item[0]}
                  </a>
                  {index === 0 && <div className={styles.navDivider}></div>}
                </React.Fragment>
              )
            })}
          </nav>
        </div>
        <div className={styles.actions}>
          <div className={styles.iconGroup}>
            <button className={styles.iconButton} aria-label="حساب کاربری">
              <RiUser3Line />
            </button>
            <div className={styles.iconDivider}></div>
            <button className={styles.iconButton} aria-label="سبد خرید">
              <RiShoppingCart2Line />
            </button>
          </div>
          <button className={`${styles.textIconButton} ${styles.consultationButton}`}>
            <RiCustomerService2Line />
            <span className={styles.buttonText}>مشاوره</span>
          </button>
          <button
            className={`${styles.iconButton} ${styles.menuButton}`}
            onClick={toggleMenu}
            aria-label="منو"
          >
            <RiMenu3Line />
          </button>
        </div>
      </div>
      <div
        className={`${styles.mobileMenuOverlay} ${
          isMenuOpen ? styles.mobileMenuOverlayActive : ''
        } ${isAnimating ? styles.mobileMenuOverlayAnimating : ''}`}
      >
        <div
          className={`${styles.mobileMenuContent} ${
            isMenuOpen ? styles.mobileMenuContentActive : ''
          }`}
        >
          <button className={styles.closeButton} onClick={toggleMenu}>
            <RiCloseLine />
          </button>
          <nav className={styles.mobileNav}>
            {navItems.map((item, index) => {
              const isActive = pathname === item[1]
              return (
                <a
                  key={index}
                  href={item[1]}
                  className={`${styles.mobileNavItem} ${isActive ? styles.active : ''}`}
                  onClick={toggleMenu}
                >
                  {item[0]}
                </a>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
