// src/components/slider/MainSlider.jsx

'use client'

import React, { useState, useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation'
import styles from './Slider.module.css'
import { SliderLeftArrow, SliderRightArrow } from '@/assets/svgs/Icons/Icons'
import Image from 'next/image'
import { getSlides } from '@/actions/admin/slides' // استفاده از سرور اکشن

export const MainSlider = () => {
  const [slides, setSlides] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // دریافت اسلایدها از سرور اکشن
    const fetchSlides = async () => {
      try {
        const slidesData = await getSlides()
        setSlides(slidesData)
      } catch (error) {
        console.error('خطا در دریافت اسلایدها:', error)
      }
    }
    fetchSlides()
  }, [])

  // تابع حرکت به اسلاید بعدی یا قبلی
  const goToSlide = (index) => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide(index)
    }
  }

  // حرکت به اسلاید قبلی
  const prevSlide = () => {
    if (slides.length > 0) {
      const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1
      goToSlide(prevIndex)
    }
  }

  // حرکت به اسلاید بعدی
  const nextSlide = () => {
    if (slides.length > 0) {
      const nextIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1
      goToSlide(nextIndex)
    }
  }

  // مدیریت قفل انیمیشن
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 500) // مدت زمان انیمیشن (500 میلی‌ثانیه)

    return () => clearTimeout(timer)
  }, [currentSlide])

  // نمایش ندادن اسلایدر در صورت نداشتن اسلاید
  if (slides.length === 0) return <div className={styles.noSlides}>اسلایدی موجود نیست</div>

  return (
    <div className={styles.slider}>
      {/* کانتینر اسلایدها */}
      <div
        className={styles.slidesContainer}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className={styles.slide}>
            <Image className={styles.bgSample} src={slide.imageUrl} fill alt={slide.title} />
            <span className={styles.blackBox} />
            <div className={styles.title}>
              {slide.title}
              <br />
              <TypeAnimation
                sequence={slide.typeAnimation.flatMap((text) => [text, 2000])} // اضافه کردن وقفه بین هر متن
                wrapper="span"
                repeat={Infinity}
              />
            </div>
          </div>
        ))}
      </div>

      {/* دکمه‌های ناوبری */}
      {slides.length > 1 && (
        <>
          <SliderLeftArrow
            className={styles.prevButton}
            onClick={nextSlide}
            disabled={isAnimating}
          />
          <SliderRightArrow
            className={styles.nextButton}
            onClick={prevSlide}
            disabled={isAnimating}
          />
        </>
      )}
    </div>
  )
}
