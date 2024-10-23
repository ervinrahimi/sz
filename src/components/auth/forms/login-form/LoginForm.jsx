'use client'

import { FormError, FormSuccess } from '@/components/forms/message/Message'
import { loginSchema } from '@/security/zod/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { login } from '@/actions/auth/login'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import styles from './LoginForm.module.css'

export default function LoginForm({ className }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) })
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'ایمیل قبلاً با ارائه‌دهنده دیگری ثبت شده است!'
      : ''

  const onSubmit = async (data) => {
    setError('')
    setSuccess('')

    return await login(data, callbackUrl)
      .then((data) => {
        if (data?.error) {
          setError(data.error)
        }

        if (data?.success) {
          reset()
          setSuccess(data.success)
        }

        if (data?.twoFactor) {
          setShowTwoFactor(true)
          setSuccess('کد تایید به ایمیل ارسال شد!')
        }
      })
      .catch(() => setError('مشکلی پیش آمده است'))
  }

  return (
    <form className={`${className} ${styles.loginForm}`} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>ایجاد حساب کاربری</h1>
      {!showTwoFactor && (
        <>
          <input
            disabled={isSubmitting}
            type="email"
            placeholder="ایمیل"
            {...register('email')}
            className={styles.input}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          <input
            disabled={isSubmitting}
            type="password"
            placeholder="رمز عبور"
            {...register('password')}
            className={styles.input}
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </>
      )}

      {showTwoFactor && (
        <>
          <input
            disabled={isSubmitting}
            type="text"
            placeholder="کد دو مرحله‌ای"
            {...register('code')}
            className={styles.input}
          />
          {errors.code && <p className={styles.error}>{errors.code.message}</p>}
        </>
      )}

      <FormError message={error || urlError} className={styles.error} />
      <FormSuccess message={success} className={styles.success} />

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        ورود به حساب
      </button>
      <p className={styles.subtitle}>
        حساب ندارید ؟{' '}
        <a href="/auth/register" className={styles.link}>
          ثبت نام
        </a>
      </p>
      <p className={styles.subtitle}>
        رمز خود را فراموش کردید ؟{' '}
        <a href="/auth/forgot-password" className={styles.link}>
          فراموش رمز عبور
        </a>
      </p>
    </form>
  )
}
