// src/components/dashboard/ChangePassword/ChangePassword.jsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema } from '@/security/zod/validationSchema'
import styles from '@/styles/form.module.css'
import { changePassword } from '@/actions/dashboard/changePassword'
import { useState } from 'react'

export default function ChangePassword() {
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  })

  const onSubmit = async (data) => {
    const res = await changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    })

    if (res.success) {
      reset()
      setMessage('رمز عبور با موفقیت تغییر کرد.')
    } else {
      setMessage(res.message || 'خطا در تغییر رمز عبور.')
    }
  }

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>تغییر رمز عبور</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <label className={styles.formLabel}>
          رمز عبور فعلی:
          <input
            type="password"
            {...register('currentPassword')}
            className={styles.formInput}
          />
          {errors.currentPassword && <p className={styles.formError}>{errors.currentPassword.message}</p>}
        </label>
        <label className={styles.formLabel}>
          رمز عبور جدید:
          <input
            type="password"
            {...register('newPassword')}
            className={styles.formInput}
          />
          {errors.newPassword && <p className={styles.formError}>{errors.newPassword.message}</p>}
        </label>
        <label className={styles.formLabel}>
          تکرار رمز عبور جدید:
          <input
            type="password"
            {...register('confirmNewPassword')}
            className={styles.formInput}
          />
          {errors.confirmNewPassword && <p className={styles.formError}>{errors.confirmNewPassword.message}</p>}
        </label>
        <button type="submit" className={styles.formButton}>تغییر رمز عبور</button>
      </form>
      {message && <p className={styles.formMessage}>{message}</p>}
    </div>
  )
}
