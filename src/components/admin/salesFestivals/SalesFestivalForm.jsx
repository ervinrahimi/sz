'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { createSalesFestival, updateSalesFestival } from '@/actions/admin/salesFestivals'
import styles from './SalesFestivalForm.module.css'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function SalesFestivalForm({ festival, salesConditions }) {
  const isEdit = !!festival
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (isEdit && festival) {
      // بررسی وجود festival
      setValue('name', festival.name || '')
      setValue('description', festival.description || '')

      // بررسی وجود startDate و تبدیل آن به رشته برای استفاده از split
      const startDate = festival.startDate
        ? new Date(festival.startDate).toISOString().split('T')[0]
        : ''
      setValue('startDate', startDate)

      // بررسی وجود endDate و تبدیل آن به رشته برای استفاده از split
      const endDate = festival.endDate ? new Date(festival.endDate).toISOString().split('T')[0] : ''
      setValue('endDate', endDate)

      setValue('salesConditionIds', festival.salesConditions?.map((sc) => sc.id) || [])
    }
  }, [isEdit, festival, setValue])

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateSalesFestival(festival.id, data)
        toast.success('جشنواره با موفقیت ویرایش شد')
      } else {
        await createSalesFestival(data)
        toast.success('جشنواره با موفقیت ایجاد شد')
      }
      router.push('/admin/sales-festivals')
    } catch (error) {
      toast.error('مشکلی پیش آمد. لطفاً دوباره تلاش کنید.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
      <h2>{isEdit ? 'ویرایش جشنواره' : 'ایجاد جشنواره جدید'}</h2>
      <div className={styles.formContainer}>
        <label>
          نام جشنواره:
          <input
            type="text"
            {...register('name', { required: 'این فیلد اجباری است' })}
            className={styles.formInput}
          />
          {errors.name && <span className={styles.formError}>{errors.name.message}</span>}
        </label>

        <label>
          توضیحات:
          <textarea {...register('description')} className={styles.formInput} />
        </label>

        <label>
          تاریخ شروع:
          <input
            type="date"
            {...register('startDate', { required: 'این فیلد اجباری است' })}
            className={styles.formInput}
          />
          {errors.startDate && <span className={styles.formError}>{errors.startDate.message}</span>}
        </label>

        <label>
          تاریخ پایان:
          <input
            type="date"
            {...register('endDate', { required: 'این فیلد اجباری است' })}
            className={styles.formInput}
          />
          {errors.endDate && <span className={styles.formError}>{errors.endDate.message}</span>}
        </label>

        <label>
          شرایط فروش مرتبط:
          <select multiple {...register('salesConditionIds')} className={styles.formSelect}>
            {salesConditions.map((condition) => (
              <option key={condition.id} value={condition.id}>
                {condition.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className={styles.formButton}>
          {isEdit ? 'ویرایش جشنواره' : 'ایجاد جشنواره'}
        </button>
      </div>
    </form>
  )
}
