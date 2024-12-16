'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from './legal-contact.module.css'

// داده‌های مقالات همراه با تصاویر
const articles = [
  {
    id: 1,
    title: 'بررسی جامع خودرو Geely Azkara',
    slug: 'comprehensive-review-geely-azkara',
    description: 'بررسی طراحی، مشخصات فنی، امکانات رفاهی و مقایسه با رقبا برای خودروی جیلی آزکارا.',
    image: '/uploads/geely_azkara.jpg'
  },
  {
    id: 2,
    title: 'مقایسه خودروهای برقی و بنزینی',
    slug: 'electric-vs-gasoline-cars',
    description: 'بررسی مزایا و معایب خودروهای برقی و بنزینی و تاثیرات آنها بر محیط زیست و هزینه‌های نگهداری.',
    image: '/uploads/electric_vs_gasoline.jpg'
  },
  {
    id: 3,
    title: 'ورود خودروهای الکتریکی به ایران و تأثیر آن بر آینده حمل‌ونقل',
    slug: 'electric-cars-in-iran',
    description: 'تحلیلی بر ورود خودروهای الکتریکی به ایران و اثرات زیست‌محیطی و اقتصادی آن.',
    image: '/uploads/electric_cars_iran.jpg'
  }
];

export default function LegalContact() {
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % articles.length);
        setOpacity(1);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentArticle = articles[currentArticleIndex];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.content}>
          <h1 className={styles.title}>{currentArticle.title}</h1>
          <p className={styles.subtitle}>{currentArticle.description}</p>
          <div className={styles.buttons}>
            <Link href={`/blog/${currentArticle.slug}`} className={styles.primaryButton}>
              مشاهده مقاله
            </Link>
            <Link href="/blog" className={styles.secondaryButton}>
              رفتن به صفحه مقالات
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
            src={currentArticle.image}
            alt={currentArticle.title}
            width={500}
            height={600}
            className={styles.image}
            style={{ opacity: opacity, transition: 'opacity 0.3s ease-in-out' }}
          />
        </div>
      </div>
    </div>
  );
}
