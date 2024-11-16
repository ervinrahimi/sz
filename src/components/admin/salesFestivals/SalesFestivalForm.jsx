'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import { createSalesFestival, updateSalesFestival } from '@/actions/admin/salesFestivals'
import toast from 'react-hot-toast'
import styles from '@/styles/form.module.css'

export default function SalesFestivalForm({ festival, salesConditions }) {
  const router = useRouter()
  const isEdit = !!festival
  const [selectedCondition, setSelectedCondition] = useState(festival?.salesConditions[0]?.id || '')
  const [startDate, setStartDate] = useState(
    festival?.startDate ? new Date(festival.startDate) : null
  )
  const [endDate, setEndDate] = useState(festival?.endDate ? new Date(festival.endDate) : null)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: festival?.name || '',
      description: festival?.description || '',
    },
  })

  const onSubmit = async (data) => {
    try {
      const start = startDate ? new Date(startDate).toISOString() : null
      const end = endDate ? new Date(endDate).toISOString() : null

      const formData = {
        ...data,
        startDate: start,
        endDate: end,
        salesCondition: selectedCondition,
      }

      if (isEdit) {
        await updateSalesFestival(festival.id, formData)
        toast.success('جشنواره با موفقیت ویرایش شد!')
      } else {
        await createSalesFestival(formData)
        toast.success('جشنواره با موفقیت ایجاد شد!')
      }

      router.push('/admin/sales-festivals')
      router.refresh()
    } catch (error) {
      console.error('خطا در ارسال اطلاعات:', error)
      toast.error('عملیات با خطا مواجه شد.')
    }
  }

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>{isEdit ? 'ویرایش جشنواره' : 'ایجاد جشنواره'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <label className={styles.formLabel}>
          نام جشنواره:
          <input
            type="text"
            {...register('name')}
            placeholder="نام جشنواره"
            required
            className={styles.formInput}
          />
        </label>

        <label className={styles.formLabel}>
          توضیحات جشنواره:
          <textarea
            {...register('description')}
            placeholder="توضیحات جشنواره"
            className={styles.formInput}
          />
        </label>

        <label className={styles.formLabel}>
          تاریخ شروع:
          <DatePicker
            value={startDate}
            onChange={(value) => setStartDate(new Date(value))}
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD"
            placeholder="تاریخ شروع"
            required
            className={`${styles.formInput} ${styles.formLtr}`}
          />
        </label>

        <label className={styles.formLabel}>
          تاریخ پایان:
          <DatePicker
            value={endDate}
            onChange={(value) => setEndDate(new Date(value))}
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD"
            placeholder="تاریخ پایان"
            required
            className={`${styles.formInput} ${styles.formLtr}`}
          />
        </label>

        <label className={styles.formLabel}>
          شرایط فروش:
          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            required
            className={styles.formSelect}
          >
            <option value="" disabled>
              انتخاب شرایط فروش
            </option>
            {salesConditions.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.name} - {sc.car?.name || 'بدون خودرو'}
              </option>
            ))}
          </select>
        </label>

        <div className={styles.formStatusButtonGroup}>
          <button type="submit" className={styles.formButton}>
            {isEdit ? 'ویرایش' : 'ایجاد'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/sales-festivals')}
            className={styles.buttonStatus}
          >
            لغو
          </button>
        </div>
      </form>
    </div>
  )
}
