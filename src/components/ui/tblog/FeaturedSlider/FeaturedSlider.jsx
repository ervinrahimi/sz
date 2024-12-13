'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { sliderItems } from '../data/news'
import styles from './FeaturedSlider.module.css'

import 'swiper/css'

export default function FeaturedSlider() {
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(null)
  const autoplayDuration = 5000 // 5 seconds

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
        {sliderItems.map(item => (
          <SwiperSlide key={item.id}>
            <div className={styles.slide}>
              <img src={item.image} alt={item.title} className={styles.image} />
              <div className={styles.overlay}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.subtitle}>{item.subtitle}</p>
                <div className={styles.content}>
                  <div className={styles.author}>
                    <img 
                      src={item.author.avatar} 
                      alt={item.author.name} 
                      className={styles.avatar}
                    />
                    <span className={styles.name}>{item.author.name}</span>
                  </div>
                  <div className={styles.date}>{item.date}</div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.progressBarContainer}>
        <div ref={progressRef} className={styles.progressBar}></div>
      </div>
    </div>
  )
}

