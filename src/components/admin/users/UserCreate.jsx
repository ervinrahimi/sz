'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { createUser } from '@/actions/admin/user'
import { userCreateSchema } from '@/security/zod/validationSchema'
import toast from 'react-hot-toast'
import styles from '@/styles/form.module.css'

export default function UserCreate() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userCreateSchema),
  })

  const onSubmit = async (data) => {
    // حذف confirmPassword از داده‌ها
    const { confirmPassword, ...userData } = data

    try {
      await createUser(userData)
      toast.success('کاربر با موفقیت ایجاد شد.')
      reset() // ریست کردن فرم بعد از موفقیت
      router.push('/admin/users') // ریدایرکت به صفحه کاربران
      router.refresh()
    } catch (error) {
      toast.error(error.message || 'خطایی رخ داده است!')
    }
  }

  return (
    <div className={styles.formWrapper}>
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
          کد ملی:
          <input type="text" {...register('nationalCode')} className={styles.formInput} />
          {errors.nationalCode && <p className={styles.formError}>{errors.nationalCode.message}</p>}
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
          رمز عبور:
          <input type="password" {...register('password')} className={styles.formInput} />
          {errors.password && <p className={styles.formError}>{errors.password.message}</p>}
        </label>

        <label className={styles.formLabel}>
          تایید رمز عبور:
          <input type="password" {...register('confirmPassword')} className={styles.formInput} />
          {errors.confirmPassword && (
            <p className={styles.formError}>{errors.confirmPassword.message}</p>
          )}
        </label>

        <label className={styles.formLabel}>
          نقش:
          <select {...register('role')} className={styles.formSelect}>
            <option value="0">کاربر عادی</option>
            <option value="1">ادمین</option>
          </select>
          {errors.role && <p className={styles.formError}>{errors.role.message}</p>}
        </label>

        <button className={styles.formButton} type="submit">
          ایجاد کاربر
        </button>
      </form>
    </div>
  )
}
