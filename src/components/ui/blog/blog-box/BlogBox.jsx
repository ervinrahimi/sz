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

// Import posts data
import { posts } from '@/components/ui/tblog/data/posts'

export default function BlogBox({ title, subTitle }) {
  const router = useRouter()

  const handleViewClick = (slug) => () => {
    if (slug) {
      router.push(`/blog/${slug}`)
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
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            640: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          className="mySwiper"
        >
          {posts.map((post, index) => (
            <SwiperSlide key={index}>
              <div className={styles.box}>
                <div className={styles.colorContainer}>
                  <span className={styles.tag}>{post.content.sections[0].heading}</span>
                </div>
                <Image
                  className={styles.image}
                  src={post.image || '/placeholder.svg?height=1000&width=1000'}
                  width={1000}
                  height={1000}
                  alt={post.title}
                  onClick={handleViewClick(post.slug)}
                />
                <h4 className={styles.title} onClick={handleViewClick(post.slug)}>
                  {post.title}
                </h4>
                <h3 className={styles.subTitle} onClick={handleViewClick(post.slug)}>
                  {post.author.date}
                </h3>
                <p className={styles.text}>{post.description.slice(0, 120) + '...'}</p>
                <div className={styles.line}>
                  <span></span>
                </div>
                <div className={styles.actionBox}>
                  <button className={styles.actionButton} onClick={handleViewClick(post.slug)}>
                    مشاهده مقاله
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
