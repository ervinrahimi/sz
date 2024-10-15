'use client'
import React, { useState, useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation'
import styles from './Slider.module.css'
import { SliderLeftArrow, SliderRightArrow } from '@/assets/svgs/Icons/Icons'
import Image from 'next/image'
export const MainSlider = ({ product, imageUrl }) => {
  const [currentSlide, setCurrentSlide] = useState(0) // مدیریت ایندکس اسلاید فعلی
  const [isAnimating, setIsAnimating] = useState(false) // مدیریت وضعیت انیمیشن

  // آرایه اسلایدها (محتواهای نمونه، می‌توان به صورت داینامیک کرد)
  const initialSlides = [
    {
      id: 1,
      content: (
        <>
          <Image
            className={styles.bgSample}
            src={'/slider/2.jpg'}
            width={2000}
            height={2000}
            alt="bg"
          />
          <span className={styles.blackBox} />

          {/* بررسی وجود product و نمایش محتوای شرطی */}
          {!product && (
            <>
              <div className={styles.title}>
                خودروی مناسب شما،
                <br />
                <TypeAnimation
                  sequence={[
                    'یک قدم تا انتخاب',
                    2000,
                    'تجربه‌ای متفاوت از خرید',
                    2000,
                    'سریع و مطمئن',
                    2000,
                  ]}
                  wrapper="span"
                  repeat={Infinity}
                />
              </div>
            </>
          )}
        </>
      ),
    },
    {
      id: 2,
      content: (
        <>
          <Image
            className={styles.bgSample}
            src={'/slider/2.jpg'}
            width={2000}
            height={2000}
            alt="bg"
          />
          <span className={styles.blackBox} />

          {/* بررسی وجود product و نمایش محتوای شرطی */}
          {!product && (
            <>
              <div className={styles.title}>
                خودروی مناسب شما،
                <br />
                <TypeAnimation
                  sequence={[
                    'یک قدم تا انتخاب',
                    2000,
                    'تجربه‌ای متفاوت از خرید',
                    2000,
                    'سریع و مطمئن',
                    2000,
                  ]}
                  wrapper="span"
                  repeat={Infinity}
                />
              </div>
            </>
          )}
        </>
      ),
    },
    { id: 3, content: '' },
    { id: 4, content: '' }, // این اسلاید خالی است
  ]

  // فیلتر کردن اسلایدهای خالی
  const slides = initialSlides.filter(
    (slide) => slide.content && slide.content.toString().trim() !== ''
  )

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

  // نمایش ندادن اسلایدر در صورت نداشتن اسلاید معتبر
  if (slides.length === 0) return <div className={styles.noSlides}>اسلایدی موجود نیست</div>

  return (
    <div className={product ? styles.sliderP : styles.slider}>
      {/* کانتینر اسلایدها */}
      <div
        className={styles.slidesContainer}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className={styles.slide}>
            {slide.content}
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
