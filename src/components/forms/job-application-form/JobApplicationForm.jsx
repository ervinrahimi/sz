// app/job-application/JobApplicationForm.js

'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import styles from './JobApplicationForm.module.css'
import { SoltanZadeLogoSVG } from '@/assets/svgs/Logos/Logos'

const jobApplicationSchema = z.object({
  fullName: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  email: z.string().email('ایمیل معتبر نیست'),
  phone: z.string().min(10, 'شماره تلفن معتبر نیست'),
  position: z.string().min(1, 'لطفا موقعیت شغلی را انتخاب کنید'),
  coverLetter: z.string().min(10, 'معرفی‌نامه باید حداقل ۱۰ کاراکتر باشد'),
  linkedIn: z.string().url('لینک نامعتبر است').optional(),
})

export default function JobApplicationForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(jobApplicationSchema),
  })

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/job-application', {
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

  return (
    <div className={styles.jobApplicationFormContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.jobApplicationForm}>
        <div className={styles.logo}>
          <SoltanZadeLogoSVG className={styles.logo} />
        </div>
        <h1 className={styles.title}>درخواست همکاری</h1>
        <p className={styles.subtitle}>لطفا اطلاعات خود را وارد کنید</p>

        <input
          type="text"
          placeholder="نام و نام خانوادگی"
          {...register('fullName')}
          disabled={isSubmitting}
          className={styles.input}
        />
        {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}

        <input
          type="email"
          placeholder="ایمیل"
          {...register('email')}
          disabled={isSubmitting}
          className={styles.input}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <input
          type="text"
          placeholder="شماره تلفن"
          {...register('phone')}
          disabled={isSubmitting}
          className={styles.input}
        />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

        <select
          {...register('position')}
          disabled={isSubmitting}
          className={styles.input}
        >
          <option value="">انتخاب موقعیت شغلی</option>
          <option value="frontend">توسعه‌دهنده فرانت‌اند</option>
          <option value="backend">توسعه‌دهنده بک‌اند</option>
          <option value="fullstack">توسعه‌دهنده فول‌استک</option>
          <option value="designer">طراح UI/UX</option>
        </select>
        {errors.position && <p className={styles.error}>{errors.position.message}</p>}

        <textarea
          placeholder="معرفی و توضیحات"
          {...register('coverLetter')}
          disabled={isSubmitting}
          className={styles.input}
        ></textarea>
        {errors.coverLetter && <p className={styles.error}>{errors.coverLetter.message}</p>}

        <input
          type="url"
          placeholder="لینکدین (اختیاری)"
          {...register('linkedIn')}
          disabled={isSubmitting}
          className={styles.input}
        />
        {errors.linkedIn && <p className={styles.error}>{errors.linkedIn.message}</p>}

        <button type="submit" disabled={isSubmitting} className={styles.button}>
          ارسال درخواست
        </button>
      </form>
    </div>
  )
}