'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { posts } from '../data/posts'
import styles from './FeaturedSlider.module.css'
import Link from 'next/link'

import 'swiper/css'

export default function FeaturedSlider() {
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(null)
  const autoplayDuration = 5000 // 5 seconds

  // Select at least 5 posts (or all if there are fewer than 5)
  const featuredPosts = posts.slice(0, Math.max(5, posts.length))

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.transition = `width ${autoplayDuration}ms linear`
      progressRef.current.style.width = '100%'
    }

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0
        }
        const newProgress = oldProgress + 1
        return Math.min(newProgress, 100)
      })
    }, autoplayDuration / 100)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const handleSlideChange = () => {
    setProgress(0)
    if (progressRef.current) {
      progressRef.current.style.transition = 'none'
      progressRef.current.style.width = '0%'
      setTimeout(() => {
        if (progressRef.current) {
          progressRef.current.style.transition = `width ${autoplayDuration}ms linear`
          progressRef.current.style.width = '100%'
        }
      }, 50)
    }
  }

  return (
    <div className={styles.container}>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: autoplayDuration,
          disableOnInteraction: false,
        }}
        loop={true}
        className={styles.swiper}
        onSlideChange={handleSlideChange}
        dir="rtl"
      >
        {featuredPosts.map((post) => (
          <SwiperSlide key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <div className={styles.slide}>
                <img src={post.image} alt={post.title} className={styles.image} />
                <div className={styles.overlay}>
                  <h3 className={styles.title}>{post.title}</h3>
                  <p className={styles.subtitle}>{post.description}</p>
                  <div className={styles.content}>
                    <div className={styles.author}>
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className={styles.avatar}
                      />
                      <span className={styles.name}>{post.author.name}</span>
                    </div>
                    <div className={styles.date}>{post.author.date}</div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.progressBarContainer}>
        <div ref={progressRef} className={styles.progressBar}></div>
      </div>
    </div>
  )
}
