'use client'

import { FormError, FormSuccess } from '@/components/forms/message/Message'
import { forgotPasswordSchema } from '@/security/zod/auth-schema'
import { forgotPassword } from '@/actions/auth/forgot-password'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './ForgotPasswordForm.module.css'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import React from 'react'

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const onSubmit = async (data) => {
    setError('')
    setSuccess('')

    return await forgotPassword(data)
      .then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
      .catch(() => setError('Something went wrong'))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
      <h1 className={styles.title}>فراموشی رمز عبور</h1>
      <input disabled={isSubmitting} type="email" placeholder="ایمیل" {...register('email')} className={styles.input}/>
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      <FormError message={error} />
      <FormSuccess message={success} />
      <button type="submit" disabled={isSubmitting} className={styles.button}>
        ارسال ایمیل
      </button>
    </form>
  )
}