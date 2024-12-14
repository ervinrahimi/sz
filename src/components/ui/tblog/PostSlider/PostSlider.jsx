'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import styles from './PostSlider.module.css'
import { posts } from '../data/posts'
import 'swiper/css'
import 'swiper/css/pagination'
import PostCard from '../PostCard/PostCard'

export default function PostSlider() {
  return (
    <div className={styles.sliderContainer}>
      <div className={styles.swiperWrapper}>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          className={styles.swiper}
          dir="rtl"
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id}>
              <PostCard post={post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
