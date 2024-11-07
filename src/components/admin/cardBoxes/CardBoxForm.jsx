// src/components/admin/cardBoxes/CardBoxForm.jsx

'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCardBox, updateCardBox } from '@/actions/admin/cardBoxes'
import { cardBoxSchema } from '@/security/zod/validationSchema'
import { useRouter } from 'next/navigation'
import styles from './CardBoxForm.module.css'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function CardBoxForm({ cardBox, cars, sections }) {
  const isEdit = !!cardBox
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(cardBoxSchema),
  })

  useEffect(() => {
    if (isEdit) {
      setValue('title', cardBox.title)
      setValue('subtitle', cardBox.subtitle)
      setValue('description', cardBox.description)
      setValue('carId', cardBox.carId)
      setValue('sectionId', cardBox.sectionId)
      setValue('viewLink', cardBox.viewLink) // مقداردهی لینک مشاهده در فرم ویرایش
    }
  }, [isEdit, cardBox, setValue])

  const onSubmit = async (data) => {
    data.viewLink = '/cars/' + data.carId
    if (isEdit) {
      await updateCardBox(cardBox.id, data)
      toast.success('کارت باکس شما با موفقیت ویرایش شد', { duration: 5000 })
    } else {
      await createCardBox(data)
      toast.success('کارت باکس شما با موفقیت ساخته شد', { duration: 5000 })
    }
    router.push('/admin/card-boxes')
  }

  const handleCancel = () => {
    router.push('/admin/card-boxes')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label>
        عنوان کارت باکس:
        <input type="text" {...register('title')} />
        {errors.title && <span className={styles.error}>{errors.title.message}</span>}
      </label>

      <label>
        عنوان صفت خودرو:
        <input type="text" {...register('subtitle')} />
        {errors.subtitle && <span className={styles.error}>{errors.subtitle.message}</span>}
      </label>

      <label>
        توضیحات:
        <textarea {...register('description')} />
        {errors.description && <span className={styles.error}>{errors.description.message}</span>}
      </label>

      <label>
        لینک مشاهده:
        <input type="text" {...register('viewLink')} placeholder="لینک صفحه محصول" />
        {errors.viewLink && <span className={styles.error}>{errors.viewLink.message}</span>}
      </label>

      <label>
        انتخاب خودرو:
        <select {...register('carId')}>
          <option value="">انتخاب کنید</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>
        {errors.carId && <span className={styles.error}>{errors.carId.message}</span>}
      </label>

      <label>
        انتخاب بخش:
        <select {...register('sectionId')}>
          <option value="">انتخاب کنید</option>
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>
        {errors.sectionId && <span className={styles.error}>{errors.sectionId.message}</span>}
      </label>

      <button type="submit">{isEdit ? 'ویرایش' : 'ایجاد'}</button>
      <button type="button" onClick={handleCancel}>
        لغو
      </button>
    </form>
  )
}
