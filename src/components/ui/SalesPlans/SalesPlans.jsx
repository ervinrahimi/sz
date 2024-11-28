import React from 'react'
import styles from './SalesPlans.module.css'
import Image from 'next/image'

export default function SalesPlans() {
  return (
    <>
      <Image className={styles.bannerContainer} alt="" />بنر بالا
      <div className={styles.filterButtonContainer}>
        <button>پرایم</button>
        <button>پرستیژ</button>
        <button>آلتیمیت</button>
      </div>
      <div className={styles.saleConditionsContainer}>
        <Image className={styles.saleConditionsImage} alt="" />
        <h2 className={styles.saleConditionsTitle}>تست</h2>
        <button className={styles.saleConditionsButton}>مشاهده</button>
        <button className={styles.saleConditionsButton}>خرید</button>
      </div>
    </>
  )
}
