'use client'

import React from 'react'
import styles from './HeroSection.module.css'
import { useParams } from 'next/navigation'
import { posts } from './data/posts'

const HeroSection = () => {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return null // Or you could return a default hero section
  }

  return (
    <div className={styles.heroContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>{post.title}</h1>
          <h2 className={styles.subtitle}>{post.description}</h2>
          <div className={styles.authorInfo}>
            <div className={styles.avatarWrapper}>
              <img src={post.author.avatar} alt={post.author.name} className={styles.avatar} />
            </div>
            <div className={styles.authorDetails}>
              <p className={styles.authorName}>{post.author.name}</p>
              <p className={styles.publicationDate}>تاریخ انتشار: {post.author.date}</p>
            </div>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <img src={post.image} alt={post.title} className={styles.instructorImage} />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
