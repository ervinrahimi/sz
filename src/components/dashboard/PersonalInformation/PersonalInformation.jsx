// src/components/dashboard/PersonalInformation/PersonalInformation.jsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { personalInfoSchema } from '@/security/zod/validationSchema'
import styles from '@/styles/form.module.css'
import { updatePersonalInfo } from '@/actions/dashboard/updatePersonalInfo'
import { useState } from 'react'

export default function PersonalInformation({ user }) {
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: user.name || '',
      family: user.family || '',
      email: user.email || '',
      phone: user.phone || '',
    },
  })

  const onSubmit = async (data) => {
    const res = await updatePersonalInfo(data)
    if (res.success) {
      reset(data) // ریست کردن فرم با داده‌های جدید
      setMessage('اطلاعات با موفقیت به‌روزرسانی شد.')
    } else {
      setMessage(res.message || 'خطا در به‌روزرسانی اطلاعات.')
    }
  }

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>اطلاعات شخصی</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <label className={styles.formLabel}>
          نام:
          <input type="text" {...register('name')} className={styles.formInput} />
          {errors.name && <p className={styles.formError}>{errors.name.message}</p>}
        </label>
        <label className={styles.formLabel}>
          نام خانوادگی:
          <input type="text" {...register('family')} className={styles.formInput} />
          {errors.family && <p className={styles.formError}>{errors.family.message}</p>}
        </label>
        <label className={styles.formLabel}>
          ایمیل:
          <input type="email" {...register('email')} className={styles.formInput} />
          {errors.email && <p className={styles.formError}>{errors.email.message}</p>}
        </label>
        <label className={styles.formLabel}>
          شماره تلفن:
          <input type="text" {...register('phone')} className={styles.formInput} />
          {errors.phone && <p className={styles.formError}>{errors.phone.message}</p>}
        </label>
        <button type="submit" className={styles.formButton}>
          ذخیره تغییرات
        </button>
      </form>
      {message && <p className={styles.formMessage}>{message}</p>}
    </div>
  )
}
