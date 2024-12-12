'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './legal-contact.module.css'
import { useState, useEffect } from 'react'

const images = [
  "https://images.netdirector.co.uk/gforces-auto/image/upload/w_343,h_257,dpr_2.0,q_auto,c_fill,f_auto,fl_lossy/auto-client/7e7647bedb4566cf14afe1bf58bc257a/website_thumbnail_2_mobile.jpg",
  "https://automobilefarsi.com/images/aks/1403/08/AutomobileFa-Suba-M4-1-14030828-600400.webp",
  "https://hips.hearstapps.com/autoweek/assets/mg5.jpg"
];

export default function LegalContact() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setOpacity(1);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.content}>
          <h1 className={styles.title}>به سلطان زاده خوش آمدید</h1>
          <p className={styles.subtitle}>
            بهترین خودروها را با بهترین قیمت‌ها از ما بخواهید
          </p>
          <div className={styles.buttons}>
            <Link href="/cars" className={styles.primaryButton}>
              مشاهده خودروها
            </Link>
            <Link href="/sales-plan" className={styles.secondaryButton}>
              پیشنهادات ویژه
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.arrow}
              >
                <path
                  d="M4.16666 10H15.8333"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 4.16666L15.8333 10L10 15.8333"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src={images[currentImageIndex]}
            alt="Legal Professional"
            width={500}
            height={600}
            className={styles.image}
            style={{ opacity: opacity, transition: 'opacity 0.3s ease-in-out' }}
          />
        </div>
      </div>
    </div>
  )
}

