'use client'
import React, { useState, useEffect } from 'react'
import styles from './page.module.css'
import Header from '@/components/layout/Header/Header'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function shoppingStage2() {
  const [files1, setFiles1] = useState([])
  const [files2, setFiles2] = useState([])

  const handleFileChange1 = (e) => {
    const selectedFiles = Array.from(e.target.files)
    if (selectedFiles.length > 3) {
      alert('You can only upload up to 3 images.')
    } else {
      setFiles1(selectedFiles)
    }
  }

  const handleFileChange2 = (e) => {
    const selectedFiles = Array.from(e.target.files)
    if (selectedFiles.length > 3) {
      alert('You can only upload up to 3 images.')
    } else {
      setFiles2(selectedFiles)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // ارسال اطلاعات فایل‌ها به سرور
    console.log('Files from input 1:', files1)
    console.log('Files from input 2:', files2)
  }

  const [stageNum, setStageNum] = useState(null)
  const pathname = usePathname()

  useEffect(() => {
    // شکستن مسیر URL به بخش‌های مختلف
    const segments = pathname.split('/')

    // دریافت آخرین بخش URL
    const stage = segments[segments.length - 1]

    // گرفتن آخرین کاراکتر از بخش نهایی URL
    const finalStage = setStageNum(Number(stage.slice(-1)))

    // فقط یک بار چاپ کن
    console.log(finalStage)
  }, [pathname]) // اینجا وابستگی رو به pathname گذاشتیم که هر وقت تغییر کرد، این کد اجرا بشه

  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  const handleToast = () => {
    toast('در حال حاضر نمیتوانید این عملیات را انجام دهید')
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>بارگذاری مدارک شناسایی</h2>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.uploadForm}>
            <label className={styles.label}>بارگذاری مدارک شناسنامه</label>
            <input
              type="file"
              onChange={handleFileChange1}
              className={styles.inputFile}
              accept="image/*"
              multiple
            />
            <label className={styles.label}>بارگذاری مدارک کارت ملی</label>
            <input
              type="file"
              onChange={handleFileChange2}
              className={styles.inputFile}
              accept="image/*"
              multiple
            />
            <button type="submit" className={styles.submitButton}>
              ارسال اطلاعات
            </button>
          </form>
        </div>
        <div className={styles.alert}>
          توجه: تصاویر باید شامل صفحه رو و صفحه پشت کارت ملی، و 2 برگ اول شناسنامه شما باشد
        </div>
        <Link className={styles.link} href={`../shopping/stage-${stageNum + 1}`}>
          ورود به مرحله بعد
        </Link>
        <Link className={styles.link} href={'../shopping'}>
          بازگشت به مراحل فروش
        </Link>
      </div>
    </div>
  )
}
