'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import './BlogSlider.css'
import { posts } from './data/posts'
import Link from 'next/link'

export default function BlogSlider() {
  // Select the first 3 posts from the posts array
  const slides = posts.slice(0, 3).map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    date: post.author.date,
    author: `توسط ${post.author.name}`,
    image: post.image,
    category: 'مقاله', // You might want to add a category field to your posts if you need specific categories
    slug: post.slug,
  }))

  return (
    <div className="blog-slider">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="blog-slider-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="blog-slider-slide"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="blog-slider-overlay">
                <div className="blog-slider-content">
                  <div className="blog-slider-content-container">
                    <div className="blog-slider-info" style={{ color: 'white' }}>
                      <span className="blog-slider-category" style={{ color: 'white' }}>
                        {slide.category}
                      </span>
                      <h1 className="blog-slider-title" style={{ color: 'white' }}>
                        {slide.title}
                      </h1>
                      <p className="blog-slider-description" style={{ color: 'white' }}>
                        {slide.description}
                      </p>
                      <div className="blog-slider-meta" style={{ color: 'white' }}>
                        {slide.date} — {slide.author}
                      </div>
                      <Link
                        href={`/blog/${slide.slug}`}
                        className="blog-slider-button"
                        style={{ color: 'white' }}
                      >
                        ادامه مطلب
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
