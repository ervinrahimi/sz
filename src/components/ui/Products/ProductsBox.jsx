// src/components/ui/Products/ProductsBox.jsx

'use client'
import React from 'react'
import styles from './ProductsBox.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function ProductsBox({ title, subTitle, cardBoxes }) {
  const router = useRouter()

  const handleClick = (address) => () => {
    router.push('/cars/' + address)
  }

  const handleToastClick = () => {
    toast('لطفا وارد صفحه محصول شوید')
  }
  const handleToastClick2 = () => {
    toast('در حال حاضر این خودرو غیر فعال است')
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
              {/* اینجا می‌توانید رنگ‌های موجود را نمایش دهید */}
            </div>
            <Image
              className={styles.image}
              src={box.car.image || '/default-car.jpg'} // فرض بر این است که فیلد image در مدل Car وجود دارد
              width={1000}
              height={1000}
              alt={'car-image'}
              onClick={
                box.car.isActive ? handleClick(box.car.name.toLowerCase()) : handleToastClick2
              }
            />
            <h4
              className={styles.title}
              onClick={
                box.car.isActive ? handleClick(box.car.name.toLowerCase()) : handleToastClick2
              }
            >
              {box.car.name}
            </h4>
            <h3
              className={styles.subTitle}
              onClick={
                box.car.isActive ? handleClick(box.car.name.toLowerCase()) : handleToastClick2
              }
            >
              {box.subtitle}
            </h3>
            <p className={styles.text}>
              {box.description.slice(0, 98) + '...'}
            </p>
            <div className={styles.line}>
              <span></span>
            </div>
            <div className={styles.priceContainer}>
              <span className={styles.priceNum}>
                {box.car.price || 'توافقی'}
                <span>ت</span>
              </span>
            </div>
            <div className={styles.actionBox}>
              <button
                className={styles.actionButton}
                onClick={
                  box.car.isActive ? handleClick(box.car.name.toLowerCase()) : handleToastClick2
                }
              >
                مشاهده
              </button>
              <button className={styles.actionButton} onClick={handleToastClick}>
                سبد خرید
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
