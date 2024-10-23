// src/components/common/GlobalLoading.jsx

'use client'

import React, { useEffect, useState } from 'react'
import styles from './GlobalLoading.module.css'
import Image from 'next/image'

const GlobalLoading = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // شبیه‌سازی بارگذاری صفحه برای 2 ثانیه
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) {
    return null // زمانی که لودینگ تمام شد، کامپوننت حذف شود
  }

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.container}>
        <Image src={'/loading.png'} width={300} height={300} alt={'Logo'} />
        <div className={styles.spinner}></div>
      </div>
    </div>
  )
}

export default GlobalLoading
