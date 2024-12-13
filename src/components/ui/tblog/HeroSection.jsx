'use client'
import React from 'react'
import styles from './HeroSection.module.css'

const HeroSection = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>بازگشت به اوج</h1>
          <h2 className={styles.subtitle}>سمینار بازگشت به اوج</h2>
          <div className={styles.priceInfo}>
            <span className={styles.priceLabel}>هزینه شرکت در دوره</span>
            <span className={styles.price}>۸۰۰,۰۰۰ تومان</span>
          </div>
          <button className={styles.registerButton}>ثبت نام کنید</button>
          <div className={styles.authorInfo}>
            <div className={styles.avatarWrapper}>
              <img
                src="/placeholder.svg?height=50&width=50"
                alt="نویسنده"
                className={styles.avatar}
              />
            </div>
            <div className={styles.authorDetails}>
              <p className={styles.authorName}>علی محمدی</p>
              <p className={styles.publicationDate}>تاریخ انتشار: ۱۵ خرداد ۱۴۰۲</p>
            </div>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <img
            src="/placeholder.svg?height=500&width=400"
            alt="مدرس دوره"
            className={styles.instructorImage}
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
