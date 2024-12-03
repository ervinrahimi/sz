import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className={styles.successContainer}>
      <h1 className={styles.title}>درخواست شما با موفقیت ثبت شد!</h1>
      <p className={styles.message}>
        از شما بابت ارسال درخواست متقاضی متشکریم. اطلاعات شما ثبت شده است.
      </p>
      <Link className={styles.button} href={'/'}>
        بازگشت به صفحه اصلی
      </Link>
    </div>
  )
}
