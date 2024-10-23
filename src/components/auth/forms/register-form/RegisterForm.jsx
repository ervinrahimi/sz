'use client'

import { FormError, FormSuccess } from '@/components/forms/message/Message'
import { register as registerUser } from '@/actions/auth/register'
import { registerSchema } from '@/security/zod/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import styles from './RegisterForm.module.css'

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const onSubmit = async (data) => {
    setError('')
    setSuccess('')

    await registerUser(data)
      .then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
      .catch(() => setError('مشکلی پیش آمده است'))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
      <h1 className={styles.title}>ایجاد حساب کاربری</h1>
      <div className={styles.nameInputs}>
        <input
          disabled={isSubmitting}
          type="text"
          placeholder="نام"
          {...register('firstName')}
          className={styles.input}
        />
        <input
          disabled={isSubmitting}
          type="text"
          placeholder="نام خانوادگی"
          {...register('lastName')}
          className={styles.input}
        />
      </div>
      {(errors.firstName || errors.lastName) && (<p className={styles.error}>{errors.firstName?.message} {errors.firstName && '/'} {errors?.lastName.message}</p>)}

      <input
        disabled={isSubmitting}
        type="text"
        placeholder="ایمیل"
        {...register('email')}
        className={styles.input}
      />
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}

      <input
        disabled={isSubmitting}
        type="text"
        placeholder="رمز عبور (حداقل ۸ کاراکتر)"
        {...register('password')}
        className={styles.input}
      />
      {errors.password && <p className={styles.error}>{errors.password.message}</p>}

      <FormError message={error} className={styles.error} />
      <FormSuccess message={success} className={styles.success} />

      <div className={styles.checkbox}>
        <input type="checkbox" {...register('terms')} />
        <label>قوانین و شرایط را می‌پذیرم <a href="#">مطالعه</a></label>
      </div>

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        ثبت نام
      </button>
      <p className={styles.subtitle}>
        قبلاً حساب دارید؟{' '}
        <a href="/auth/login" className={styles.link}>
          ورود
        </a>
      </p>
    </form>
  )
}
