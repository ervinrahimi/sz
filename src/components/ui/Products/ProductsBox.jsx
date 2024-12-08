// src/components/ui/Products/ProductsBox.jsx

'use client'

import React from 'react'
import styles from './ProductsBox.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

import './ProductBoxSwiper.css'

// import required modules
import { Navigation, Pagination } from 'swiper/modules'

export default function ProductsBox({ title, subTitle, cardBoxes }) {
  const router = useRouter()

  const handleViewClick = (link) => () => {
    if (link) {
      router.push(link)
    } else {
      toast.error('لینک مشاهده موجود نیست')
    }
  }

  const handleCatalogDownload = (catalogUrl) => () => {
    if (catalogUrl) {
      window.open(catalogUrl, '_blank')
    } else {
      toast.error('کاتالوگ موجود نیست')
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
          slidesPerView={5}
          navigation={true}
          modules={[Navigation]}
          spaceBetween={20}
          centeredSlides={false}
          breakpoints={{
            // سایز دسکتاپ
            1440: {
              slidesPerView: 5,
            },
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
            cardBoxes.map((box, index) => (
                <SwiperSlide key={index}>
                  <div className={styles.box}>
                    <div className={styles.colorContainer}>
                      <span className={styles.colors} />
                      <span className={styles.colors} />
                      <span className={styles.colors} />
                    </div>
                    <Image
                      className={styles.image}
                      src={box.imageUrl || '/cars/default.png'} // لینک عکس خودرو
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
                    <div className={styles.actionBox}>
                      <button
                        className={styles.actionButton}
                        onClick={handleViewClick(box.viewLink)}
                      >
                        شرایط فروش
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={handleCatalogDownload(box.catalogUrl)}
                      >
                        دانلود کاتالوگ
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  )
}
