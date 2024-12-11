'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './legal-contact.module.css'
import { useState, useEffect } from 'react'

const images = [
  "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg?t=st=1733931782~exp=1733935382~hmac=ecaf5c797b04951251dee62fe2dd298e9b23b40afa21a6ffb47b16ae9345b8aa&w=1380",
  "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-touched-tender-smiling-asian-woman-gladly-receive-praises-hold-hands-heart-grinning-thankful-appreciate-compliment_1258-59340.jpg?t=st=1733935437~exp=1733939037~hmac=40f51812f9a3e944df7e8bac65fbf2b2cc2a40e852f73d42ac5403144e7634ee&w=1380",
  "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-thoughtful-stylish-young-woman-smiling-pleased-dreaming-imaging-perfect-plan-have-interesting-idea-thinking-looking-upper-left-corner_1258-59348.jpg?t=st=1733935475~exp=1733939075~hmac=19ed002a4bb41d1d98e78d0edc8fff44737c7602d2472335f913cc9af0a4c518&w=1380"
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
    }, 3000);

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

