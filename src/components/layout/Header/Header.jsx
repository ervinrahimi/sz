// components/ClickableDiv.js
'use client'

import React, { useState, useEffect } from 'react'
import styles from './Header.module.css'
import { SoltanZadeLogoSVG } from '@/assets/svgs/Logos/Logos'
import {
  MenuArrowIcon,
  MenuCartIcon,
  MenuIcon,
  MenuPhoneIcon,
  MenuProfileIcon,
  MenuWhatsappIcon,
} from '@/assets/svgs/Icons/Icons'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { ROUTES } from '@/constants/routes'

export default function Header({ product, menuItems, user }) {
  const [showContent, setShowContent] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [toastCount, setToastCount] = useState(0)
  const [canShowToast, setCanShowToast] = useState(true)

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

  useEffect(() => {
    if (toastCount >= 5) {
      setCanShowToast(false)

      const timer = setTimeout(() => {
        setToastCount(0)
        setCanShowToast(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [toastCount])

  const renderSubMenus = (subMenus) => {
    return (
      <ul className={styles.subMenu}>
        {subMenus &&
          subMenus.map((subMenu) => (
            <li key={subMenu.id} className={isActive(subMenu.link) ? styles.active : ''}>
              <Link href={subMenu.link || '#'}>{subMenu.title}</Link>
            </li>
          ))}
      </ul>
    )
  }

  const router = useRouter()
  const pathname = usePathname()

  const handleClick = () => {
    router.push('/'), { scroll: false }
  }

  const handleLogin = () => {
    if (user) {
      if (user.role > 0) {
        return router.push('/admin'), { scroll: false }
      }
      return router.push('/Dashboard'), { scroll: false }
    } else {
      return router.push(ROUTES.AUTH.MAIN), { scroll: false }
    }
  }

  const handleShopClick = () => {
    toast('در حال حاضر نمیتوانید این عملیات را انجام دهید')
  }

  const isActive = (path) => {
    return pathname === path
  }

  const handleMenuClick = (isLastMenu) => {
    if (!isLastMenu) {
      if (toastCount < 5) {
        toast('این منو در حال توسعه است!')
        setToastCount(toastCount + 1) // افزایش تعداد نمایش Toast
      } else {
        console.log('حداکثر تعداد Toast نمایش داده شده است.')
      }
    }
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
            menuItems.map(
              (menu) =>
                menu.isActive && (
                  <li key={menu.id} className={isActive(menu.link) ? styles.active : ''}>
                  <Link href={menu.link || '#'}>{menu.title}</Link>
                  {/* اگر زیرمنوها وجود داشته باشند، آنها را رندر کن */}
                  {menu.subMenus && menu.subMenus.length > 0 && (
                    <>
                      <MenuArrowIcon
                        className={isActive(menu.link) ? styles.active : styles.menuArrowIcon}
                      />
                      <ul className={styles.subMenu}>
                        {menu.subMenus.map((subMenu) => (
                          <li
                            key={subMenu.id}
                            className={isActive(subMenu.link) ? styles.active : ''}
                          >
                            <Link href={subMenu.link || '#'}>{subMenu.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
                )
            )}
        </ul>
      </div>

      <div className={product ? styles.containerP : styles.container}>
        <div className={styles.addressBarContainer}>
          <div className={styles.addressBar}>
            <span>رسالت شمالی، روبروی داروخانه رسالت، برج ساعت</span>
            <span>07633330003  -  02191694314</span>
          </div>
        </div>
        <div className={styles.headerMenu}>
          <div className={styles.rightSideMenu}>
            <SoltanZadeLogoSVG onClick={handleClick} className={styles.logo} />
            <ul>
              {menuItems.map((menu) => {
                if (menu.isActive) {
                  return (
                    <li key={menu.id} className={isActive(menu.link) ? styles.active : ''}>
                      <Link href={menu.link || '#'}>{menu.title}</Link>
                      {/* اگر زیرمنوها وجود داشته باشند، آنها را رندر کن */}
                      {menu.subMenus && menu.subMenus.length > 0 && (
                        <>
                          <MenuArrowIcon
                            className={isActive(menu.link) ? styles.active : styles.menuArrowIcon}
                          />
                          <ul className={styles.subMenu}>
                            {menu.subMenus.map((subMenu) => (
                              <li
                                key={subMenu.id}
                                className={isActive(subMenu.link) ? styles.active : ''}
                              >
                                <Link href={subMenu.link || '#'}>{subMenu.title}</Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </li>
                  )
                }
                return null
              })}
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

            <button className={styles.menuButton} onClick={handleLogin}>
              <MenuWhatsappIcon />
            </button>

            {!showContent ? (
              <Link href={'https://www.google.com/'} className={styles.menuLinkButton}>
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
    </>
  )
}
