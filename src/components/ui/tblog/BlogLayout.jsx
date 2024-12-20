'use client'
import React, { useState, useEffect } from 'react'
import styles from './BlogLayout.module.css'
import { Share2 } from 'lucide-react'
import { posts } from './data/posts'
import { useParams } from 'next/navigation'

const BlogLayout = ({ children }) => {
  const [activeSection, setActiveSection] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)
  const { slug } = useParams()

  const currentPost = posts.find((post) => post.slug === slug)
  const navItems = currentPost
    ? currentPost.content.sections.map((section) => ({
        id: section.id,
        title: section.heading,
      }))
    : []

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
