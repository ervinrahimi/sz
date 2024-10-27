'use client'

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import styles from './Auth.module.css'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

export default function Auth() {
  const [toastCount, setToastCount] = useState(0)
  const [isToastLimited, setIsToastLimited] = useState(false)
  const router = useRouter()

  // تابع برای نمایش Toast با محدودیت 5 بار
  const handleToast = () => {
    if (!isToastLimited) {
      if (toastCount < 5) {
        toast('این امکان فعلا در دسترس نیست')
        setToastCount(toastCount + 1)
      }
      if (toastCount + 1 === 5) {
        setIsToastLimited(true)
        setTimeout(() => {
          setToastCount(0)
          setIsToastLimited(false)
        }, 2000) // بعد از ۱۰ ثانیه محدودیت برداشته می‌شود
      }
    }
  }

  return (
    <div className={styles.container}>
      <button className={styles.signupButton} onClick={() => router.push(ROUTES.AUTH.REGISTER)}>
        ثبت نام با ایمیل
      </button>
      <button className={`${styles.signupButton}`} onClick={handleToast}>
        ثبت نام با شماره تلفن
      </button>
      <div className={styles.separator}>
        <span>یا</span>
      </div>
      <button className={styles.loginButton} onClick={() => router.push(ROUTES.AUTH.LOGIN)} >ورود</button>
    </div>
  )
}
