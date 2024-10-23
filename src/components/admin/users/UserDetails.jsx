'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from '@/security/zod/validationSchema'
import { updateUser, deleteUser } from '@/actions/admin/user' // اضافه کردن deleteUser
import styles from '@/styles/form.module.css'
import { useRouter } from 'next/navigation'

export default function UserDetails({ user }) {
  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter() // استفاده از useRouter برای هدایت پس از حذف

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: user.id,
      name: user.name || '',
      family: user.family || '',
      email: user.email || '',
      phone: user.phone || '',
      role: user.role || 0,
    },
  })

  const onSubmit = async (formData) => {
    try {
      await updateUser(formData)
      setMessage('اطلاعات کاربر با موفقیت به‌روزرسانی شد.')
      reset(formData)
      setEditing(false)
    } catch (error) {
      setMessage('خطایی رخ داده است.')
    }
  }

  const handleDelete = async () => {
    if (confirm('آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟')) {
      try {
        await deleteUser(user.id) // فراخوانی سرور اکشن برای حذف کاربر
        setMessage('کاربر با موفقیت حذف شد.')
        router.push('/admin/users') // ریدایرکت به صفحه کاربران پس از حذف
      } catch (error) {
        setMessage('حذف کاربر ناموفق بود.')
      }
    }
  }

  return (
    <div className={styles.formWrapper}>
      {editing ? (
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
            شماره تماس:
            <input type="tel" {...register('phone')} className={styles.formInput} />
            {errors.phone && <p className={styles.formError}>{errors.phone.message}</p>}
          </label>
          <label className={styles.formLabel}>
            نقش:
            <select {...register('role', { valueAsNumber: true })} className={styles.formSelect}>
              <option value={0}>کاربر عادی</option>
              <option value={1}>ادمین</option>
            </select>
            {errors.role && <p className={styles.formError}>{errors.role.message}</p>}
          </label>
          <div className={styles.buttonGroup}>
            <button className={styles.formButton} type="submit">
              ذخیره
            </button>
            <button className={styles.formButton} type="button" onClick={() => setEditing(false)}>
              لغو
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.details}>
          <p>نام: {user.name}</p>
          <p>نام خانوادگی: {user.family}</p>
          <p>کد ملی: {user.nationalCode}</p> {/* نمایش کد ملی */}
          <p>ایمیل: {user.email}</p>
          <p>شماره تماس: {user.phone}</p>
          <p>نقش: {user.role === 1 ? 'ادمین' : 'کاربر'}</p>
          <button onClick={() => setEditing(true)} className={styles.formButton}>
            ویرایش اطلاعات
          </button>
          <button
            onClick={handleDelete}
            className={`${styles.formButton} ${styles.formButtonDelete}`}
          >
            حذف کاربر {/* دکمه حذف */}
          </button>
        </div>
      )}
      {message && <p className={styles.formMessage}>{message}</p>}
    </div>
  )
}
