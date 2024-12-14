'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { posts } from './data/posts'
import 'swiper/css'
import './BestBlog.css'

export default function BestBlog() {
  const swiperRef = useRef(null)

  // Use the first 8 posts (or all if there are fewer than 8)
  const carReviews = posts.slice(0, 8).map((post) => ({
    id: post.id,
    title: post.title,
    category: 'نقد و بررسی', // You might want to add a category field to your posts if you need specific categories
    image: post.image,
    slug: post.slug,
  }))

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev()
    }
  }

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext()
    }
  }

  return (
    <section className="best-blog">
      <div className="best-blog__header">
        <h2 className="best-blog__title">بهترین نقد و بررسی‌ها</h2>
      </div>

      <div className="best-blog__slider-container">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          className="best-blog__swiper"
        >
          {carReviews.map((review) => (
            <SwiperSlide key={review.id}>
              <article className="best-blog__card">
                <Link href={`/blog/${review.slug}`}>
                  <div className="best-blog__image-container">
                    <img src={review.image} alt={review.title} className="best-blog__image" />
                    <div className="best-blog__overlay">
                      <span className="best-blog__category">{review.category}</span>
                      <h3 className="best-blog__card-title">{review.title}</h3>
                    </div>
                  </div>
                </Link>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="best-blog__navigation">
        <button className="best-blog__nav-button" onClick={handlePrev} aria-label="اسلاید قبلی">
          <ArrowRight size={20} />
        </button>
        <button className="best-blog__nav-button" onClick={handleNext} aria-label="اسلاید بعدی">
          <ArrowLeft size={20} />
        </button>
      </div>
    </section>
  )
}
