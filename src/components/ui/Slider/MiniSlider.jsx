'use client'
import React, { useRef, useState, useEffect } from 'react'
import styles from './MiniSlider.module.css'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'
import { MiniSliderCalender } from '@/assets/svgs/Icons/Icons'
import { useRouter } from 'next/navigation'

const MiniSlider = ({ images, titles, subtitles, dates, videos, links }) => {
  const router = useRouter()
  const handleLink = (link) => {
    router.push('/cars' + link + "#sharayet"), { scroll: false }
  }
  const initialSlides = [
    {
      id: 1,
      content: (
        <>
          <div className={styles.contentContainer}>
            <div
              className={styles.content}
              style={{ borderRight: 'none' }}
              onClick={() => handleLink(links?.l1)}
            >
              {videos ? (
                <video className={styles.video} autoPlay loop muted playsInline>
                  <source src="/video/1.mp4" type="video/mp4" />
                </video>
              ) : (
                <Image
                  className={styles.image}
                  src={`/posters/${images?.img1}`}
                  width={1000}
                  height={1000}
                  alt={null}
                />
              )}
              {/* <Image src="/slider/1.jpg" width={700} height={700} alt="mini-slider" /> */}
              <div className={styles.contentPosition}>
                <h3 className={styles.title}>
                  {titles?.t1}
                  <span>{titles?.t1s}</span>
                </h3>
                <h5 className={styles.subTitle}>{subtitles?.s1}</h5>
                <span className={styles.calender}>
                  <MiniSliderCalender className={styles.calenderIcon} />
                  {dates?.d1}
                </span>
              </div>
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.content} onClick={() => handleLink(links?.l2)}>
                {videos ? (
                  <video className={styles.video} autoPlay loop muted playsInline>
                    <source src="/video/2.mp4" type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    className={styles.image}
                    src={`/posters/${images?.img2}`}
                    width={1000}
                    height={1000}
                    alt={null}
                  />
                )}

                {/* <Image src="/slider/1.jpg" width={700} height={700} alt="mini-slider" /> */}
                <div className={styles.contentPosition}>
                  <h3 className={styles.title}>
                    {titles?.t2}
                    <span>{titles?.t2s}</span>
                  </h3>
                  <h5 className={styles.subTitle}>{subtitles?.s2}</h5>
                  <span className={styles.calender}>
                    <MiniSliderCalender className={styles.calenderIcon} />
                    {dates?.d2}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    },
  ]

  const [slides, setSlides] = useState(initialSlides)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragStartX, setDragStartX] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [translateX, setTranslateX] = useState(0)
  const [dragSpeed, setDragSpeed] = useState(0.3) // سرعت درگ قابل تنظیم
  const [isAnimating, setIsAnimating] = useState(false) // قفل کردن انیمیشن
  const slidesContainerRef = useRef(null)

  return (
    <div className={styles.slider}>
      <div className={styles.slidesContainer} ref={slidesContainerRef}>
        {slides.map((slide) => (
          <div key={slide.id} className={styles.slide}>
            {slide.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MiniSlider
