'use client'
import React, { useState, useEffect } from 'react'
import styles from './BlogLayout.module.css'
import { Share2 } from 'lucide-react'

const BlogLayout = ({ children }) => {
  const [activeSection, setActiveSection] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const winScroll = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setScrollProgress(scrolled)

      // Determine active section based on scroll position
      const sections = document.querySelectorAll('[id]')
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'introduction', title: 'مقدمه' },
    { id: 'ios-4', title: 'معرفی iOS 4' },
    { id: 'ios-5', title: 'تحول با iOS 5' },
    { id: 'ios-6', title: 'تغییرات iOS 6' },
    { id: 'ios-7', title: 'انقلاب طراحی در iOS 7' },
    { id: 'ios-8-9', title: 'پیشرفت‌های iOS 8 و 9' },
    { id: 'ios-today', title: 'iOS امروز' },
  ]

  return (
    <div className={`${styles.container} ${styles.equalSidebars}`}>
      {/* Right Sidebar */}
      <aside className={`${styles.rightSidebar} ${styles.fitContent} ${styles.stickyRightSidebar}`}>
        <div>
          <nav>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={styles.mainContentWrapper}>
        <main className={styles.mainContent}>{children}</main>
      </div>

      {/* Left Sidebar */}
      <aside className={`${styles.leftSidebar} ${styles.fitContent} ${styles.stickyLeftSidebar}`}>
        <div className={styles.leftSidebarContent}>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar} style={{ height: `${scrollProgress}%` }}></div>
          </div>
          <button className={styles.shareButton}>
            <Share2 size={20} />
            <span className={styles.shareText}>اشتراک‌گذاری</span>
          </button>
        </div>
      </aside>
    </div>
  )
}

export default BlogLayout
