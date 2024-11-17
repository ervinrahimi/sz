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
import 'swiper/css/pagination'

import './ProductBoxStyles.css'

// import required modules
import { Pagination } from 'swiper/modules'

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
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {cardBoxes &&
            cardBoxes.map((box) => (
              <>
                <SwiperSlide>
                  {' '}
                  <div key={box.id} className={styles.box}>
                    <div className={styles.colorContainer}>
                      <span className={styles.colors} />
                      <span className={styles.colors} />
                      <span className={styles.colors} />
                    </div>
                    <Image
                      className={styles.image}
                      src={box.car.image[0]} // لینک عکس خودرو
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
              </>
            ))}
        </Swiper>
      </div>
      <div className={styles.container}>
        {cardBoxes &&
          cardBoxes.map((box) => (
            <>
              <div key={box.id} className={styles.box}>
                <div className={styles.colorContainer}>
                  <span className={styles.colors} />
                  <span className={styles.colors} />
                  <span className={styles.colors} />
                </div>
                <Image
                  className={styles.image}
                  src={box.car.image[0]} // لینک عکس خودرو
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
                  <button className={styles.actionButton} onClick={handleViewClick(box.viewLink)}>
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
            </>
          ))}
      </div>
    </>
  )
}
