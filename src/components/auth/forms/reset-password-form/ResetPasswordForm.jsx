'use client'

import { resetPasswordSchema } from '@/security/zod/auth-schema'
import { FormError } from '@/components/forms/message/Message'
import { resetPassword } from '@/actions/auth/reset-password'
import { AUTH_ROUTES } from '@/constants/routes/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import styles from './ResetPasswordForm.module.css'

export default function ResetPasswordForm({ token }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) })
  const [error, setError] = useState('')
  const router = useRouter()

  const onSubmit = async (data) => {
    setError('')

    return await resetPassword(data, token)
      .then((data) => {
        setError(data?.error)
        if (data?.success) return router.push(AUTH_ROUTES.LOGIN)
      })
      .catch(() => setError('Something went wrong'))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.resetPasswordForm}>
      <h1 className={styles.title}>لطفا رمز عبور جدید را وارد کنید</h1>
      <input
        type="password"
        placeholder="رمز عبور"
        {...register('password')}
        className={styles.input}
      />
      {errors.password && <p className={styles.error}>{errors.password.message}</p>}
      <input
        type="password"
        placeholder="تکرار رمز عبور"
        {...register('confirmPassword')}
        className={styles.input}
      />
      {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
      <FormError message={error} />
      <button type="submit" disabled={isSubmitting} className={styles.button}>
        تغییر رمز عبور
      </button>
    </form>
  )
}
