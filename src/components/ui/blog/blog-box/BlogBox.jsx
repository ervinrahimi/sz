// src/components/ui/Products/ProductsBox.jsx

'use client'

import React from 'react'
import styles from './BlogBox.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

import './BlogBoxSwiper.css'

// import required modules
import { Navigation } from 'swiper/modules'

export default function BlogBox({ title, subTitle, cardBoxes }) {
  const router = useRouter()

  const handleViewClick = (link) => () => {
    if (link) {
      router.push(link)
    } else {
      toast.error('لینک مشاهده موجود نیست')
    }
  }

  return (
    <>
      <div className={title ? styles.titleContainer : styles.titleOff}>
        <h3>{title}</h3>
        <p>{subTitle}</p>
      </div>
      <div className={styles.container}>
        <Swiper
          dir={'rtl'}
          slidesPerView={4}
          navigation={true}
          modules={[Navigation]}
          spaceBetween={40}
          centeredSlides={false}
          breakpoints={{
            // سایز دسکتاپ
            1024: {
              slidesPerView: 4,
            },
            // سایز لپ‌تاپ
            768: {
              slidesPerView: 3,
            },
            // سایز تبلت
            640: {
              slidesPerView: 2,
            },
            // سایز موبایل
            0: {
              slidesPerView: 1,
            },
          }}
          className="mySwiper"
        >
          {cardBoxes &&
            cardBoxes.map((box) => (
              <>
                <SwiperSlide>
                  <div key={box.id} className={styles.box}>
                    <div className={styles.colorContainer}>
                      <span className={styles.tag} >{box.tag}</span>
                    </div>
                    <Image
                      className={styles.image}
                      src={box.imageUrl || ''} // لینک عکس
                      width={1000}
                      height={1000}
                      alt={'car-image'}
                      onClick={handleViewClick(box.viewLink)}
                    />
                    <h4 className={styles.title} onClick={handleViewClick(box.viewLink)}>
                      {box.title}
                    </h4>
                    <h3 className={styles.subTitle} onClick={handleViewClick(box.viewLink)}>
                      {box.date}
                    </h3>
                    <p className={styles.text}>{box.description.slice(0, 120) + '...'}</p>
                    <div className={styles.line}>
                      <span></span>
                    </div>
                    <div className={styles.actionBox}>
                      <button
                        className={styles.actionButton}
                        onClick={handleViewClick(box.viewLink)}
                      >
                        مشاهده مقاله
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              </>
            ))}
        </Swiper>
      </div>
    </>
  )
}
