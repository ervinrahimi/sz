import React from 'react'
import Image from 'next/image'
import styles from './Posters.module.css'
export const WideLightPoster = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image src={'/posters/wide.jpg'} width={1500} height={1500} alt="animation" />
        <div className={styles.h3}>شماره‌های تماس</div>
        <div className={styles.textContainer}>
          <div>07633330003</div>
          <div>02191694314</div>
          <span>09120827803</span>
          {/* <span>09179006122</span> */}
        </div>
      </div>
    </div>
  )
}
