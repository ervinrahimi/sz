'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import styles from './ApplicantRequestForm.module.css'
import { SoltanZadeLogoSVG } from '@/assets/svgs/Logos/Logos'
import { ROUTES } from '@/constants/routes'

const applicantRequestSchema = z.object({
  firstName: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  lastName: z.string().min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد'),
  nationalId: z.string().length(10, 'کد ملی باید ۱۰ رقم باشد'),
  gender: z.enum(['male', 'female'], 'لطفاً جنسیت را انتخاب کنید'),
  fatherName: z.string().min(2, 'نام پدر باید حداقل ۲ کاراکتر باشد'),
  address: z.string().min(10, 'نشانی باید حداقل ۱۰ کاراکتر باشد'),
  province: z.string().min(2, 'نام استان باید حداقل ۲ کاراکتر باشد'),
  city: z.string().min(2, 'نام شهر باید حداقل ۲ کاراکتر باشد'),
  email: z.string().email('ایمیل معتبر نیست'),
})

export default function ApplicantRequestForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(applicantRequestSchema),
  })

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/applicant-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('درخواست شما با موفقیت ارسال شد')
        router.push('/')
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'مشکلی پیش آمده است')
      }
    } catch (error) {
      toast.error('مشکلی پیش آمده است')
    }
  }

  const handelClick = () => {
    router.push(ROUTES.ROOT.MAIN)
  }

  return (
    <div className={styles.applicantRequestFormContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.applicantRequestForm}>
        <div className={styles.logo}>
          <SoltanZadeLogoSVG className={styles.logo} />
        </div>
        <h1 className={styles.title}>درخواست متقاضی</h1>
        <p className={styles.subtitle}>لطفا اطلاعات خود را وارد کنید</p>

        <input
          type="text"
          placeholder="نام"
          {...register('firstName')}
          disabled={isSubmitting}
          className={styles.input}
        />
        {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}

        <input
          type="text"
          placeholder="نام خانوادگی"
          {...register('lastName')}
          disabled={isSubmitting}
          className={styles.input}
        />
        {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}

        <input
          type="text"
          placeholder="کد ملی"
          {...register('nationalId')}
          disabled={isSubmitting}
          className={styles.input}
        />
        {errors.nationalId && <p className={styles.error}>{errors.nationalId.message}</p>}

        <select {...register('gender')} disabled={isSubmitting} className={styles.input}>
          <option value="">انتخاب جنسیت</option>
          <option value="male">مرد</option>
          <option value="female">زن</option>
        </select>
        {errors.gender && <p className={styles.error}>{errors.gender.message}</p>}

        <input
          type="text"
          placeholder="نام پدر"
          {...register('fatherName')}
          disabled={isSubmitting}
          className={styles.input}
        />
        {errors.fatherName && <p className={styles.error}>{errors.fatherName.message}</p>}

        <input
          type="text"
          placeholder="نشانی محل سکونت"
          {...register('address')}
          disabled={isSubmitting}
          className={styles.input}
        />
        {errors.address && <p className={styles.error}>{errors.address.message}</p>}

        <input
          type="text"
          placeholder="نام استان"
          {...register('province')}
          disabled={isSubmitting}
          className={styles.input}
        />
        {errors.province && <p className={styles.error}>{errors.province.message}</p>}

        <input
          type="text"
          placeholder="نام شهر"
          {...register('city')}
          disabled={isSubmitting}
          className={styles.input}
        />
        {errors.city && <p className={styles.error}>{errors.city.message}</p>}

        <input
          type="email"
          placeholder="ایمیل"
          {...register('email')}
          disabled={isSubmitting}
          className={styles.input}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <button type="submit" disabled={isSubmitting} className={styles.button}>
          ارسال درخواست
        </button>

        <p onClick={handelClick} className={styles.backButton}>
          بازگشت به صفحه اصلی
        </p>
      </form>
    </div>
  )
}
