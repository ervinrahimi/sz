"use client"

import { useEffect, useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import styles from './page.module.css'
import { emailVerify } from '@/actions/auth/email-verify' // همان Server Action قبل

export default function VerifyEmailPage({ searchParams }) {
  const [message, setMessage] = useState('در حال بررسی...')
  const router = useRouter()

  useEffect(() => {
    const verify = async () => {
      if (!searchParams.token) {
        setMessage('توکن وارد نشده!')
        return
      }

      const data = await emailVerify(searchParams.token)
      if (!data.success) {
        setMessage(data.error)
        return
      }

      // از token موقت برای لاگین استفاده می‌کنیم
      const { email, loginToken } = data
      const result = await signIn('credentials', { redirect: false, email, token: loginToken })

      if (result?.error) {
        setMessage('خطایی در لاگین رخ داد: ' + result.error)
      } else {
        // ورود موفق بود. حالا session را بگیرید تا role را بدست آورید
        const session = await getSession()

        // Toast موفقیت
        toast.success('ایمیل شما با موفقیت تایید شد.', { duration: 5000 })

        // هدایت بر اساس نقش کاربر
        if (session.user.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/Dashboard')
        }

        setMessage('ایمیل شما با موفقیت تایید شد و در حال هدایت هستید...')
      }
    }

    verify()
  }, [searchParams.token, router])

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>{message}</h1>
      </div>
    </div>
  )
}
