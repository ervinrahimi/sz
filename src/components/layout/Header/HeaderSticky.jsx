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
  MenuIcon,
  MenuWhatsappIcon
} from '@/assets/svgs/Icons/Icons'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function HeaderSticky({ menuItems }) {
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

  const handleLogin = () => {
    router.push('/Dashboard'), { scroll: false }
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
          {menuItems &&
              menuItems.map((menu) => 
                menu.isActive && (
                  <li key={menu.id} className={isActive(menu.link) ? styles.active : ''}>
                    <Link href={menu.link || '#'}>{menu.title}</Link>
                  </li>
                )
            )}
        </ul>
      </div>

      <div className={`${styles.stickyContainer} ${isVisible ? styles.visible : styles.hidden}`}>
        <div className={styles.container}>
          <div className={styles.headerMenu}>
            <div className={styles.rightSideMenu}>
              <SoltanZadeLogoSVG onClick={handleClick} className={styles.logo} />
              <ul>
                {menuItems && menuItems.map((menu) => menu.isActive && (
                    <li key={menu.id} className={isActive(menu.link) ? styles.active : ''}>
                      <Link href={menu.link || '#'}>
                        {menu.title}
                      </Link>
                      {menu.subMenus.length > 0 && <MenuArrowIcon className={isActive(menu.link) ? styles.active : 'menuArrowIcon'} />} 
                      {menu.subMenus && menu.subMenus.length > 0 && (
                        <ul className={styles.subMenu}>
                          {menu.subMenus && menu.subMenus.map((subMenu) => (
                            <li key={subMenu.id} className={isActive(subMenu.link) ? styles.active : ''}>
                              <Link href={subMenu.link || '#'}>{subMenu.title}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
            </div>
            <div className={styles.leftSideMenu}>
              {/* <button className={styles.menuButton} onClick={handleShopClick}>
                <MenuSearchIcon />
              </button> */}
              <button className={styles.menuButton} onClick={handleShopClick}>
                <MenuCartIcon />
              </button>

              <button className={styles.menuButton} onClick={handleLogin}>
                <MenuProfileIcon />
              </button>
              <button className={styles.menuButton} onClick={handleShopClick}>
                <MenuWhatsappIcon />
              </button>
              {!showContent ? (
                <Link href={'tel:09035434627'} className={styles.menuLinkButton}>
                  <MenuPhoneIcon className={styles.phoneIcon} />
                </Link>
              ) : (
                <Link href={'tel:09035434627'} className={styles.menuLinkButton}>
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
