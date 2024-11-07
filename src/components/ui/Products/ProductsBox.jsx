// src/components/ui/Products/ProductsBox.jsx

'use client'

import React from 'react'
import styles from './ProductsBox.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function ProductsBox({ title, subTitle, cardBoxes }) {
  const router = useRouter()

  const handleViewClick = (link) => () => {
    if (link) {
      router.push(link)
    } else {
      toast.error('لینک مشاهده موجود نیست')
    }
  }

  const handleCartClick = () => {
    toast('لطفا وارد صفحه محصول شوید')
  }

  return (
    <>
      <div className={title ? styles.titleContainer : styles.titleOff}>
        <h3>{title}</h3>
        <p>{subTitle}</p>
      </div>
      <div className={styles.container}>
        {cardBoxes && cardBoxes.map((box) => (
          <div key={box.id} className={styles.box}>
            <div className={styles.colorContainer}>
              <span className={styles.colors} />
              <span className={styles.colors} />
              <span className={styles.colors} />
            </div>
            <Image
              className={styles.image}
              src={box.car.image} // لینک عکس خودرو
              width={1000}
              height={1000}
              alt={'car-image'}
              onClick={handleViewClick(box.viewLink)}
            />
            <h4 className={styles.title} onClick={handleViewClick(box.viewLink)}>
              {box.car.name}
            </h4>
            <h3 className={styles.subTitle} onClick={handleViewClick(box.viewLink)}>
              {box.subtitle}
            </h3>
            <p className={styles.text}>{box.description.slice(0, 98) + '...'}</p>
            <div className={styles.line}>
              <span></span>
            </div>
            <div className={styles.priceContainer}>
              <span className={styles.priceNum}>
                {box.price}
                <span>ت</span>
              </span>
            </div>
            <div className={styles.actionBox}>
              <button className={styles.actionButton} onClick={handleViewClick(box.viewLink)}>
                مشاهده
              </button>
              <button className={styles.actionButton} onClick={handleCartClick}>
                سبد خرید
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
