// src/components/admin/cardBoxes/CardBoxForm.jsx

'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCardBox, updateCardBox } from '@/actions/admin/cardBoxes'
import { useRouter } from 'next/navigation'
import styles from '@/styles/form.module.css'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { cardBoxSchema } from '@/security/zod/validationSchema'

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
    }
  }, [isEdit, cardBox, setValue])

  const onSubmit = async (data) => {
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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <label className={styles.formLabel}>
        عنوان کارت باکس:
        <input type="text" {...register('title')} className={styles.formInput} />
        {errors.title && <span className={styles.formError}>{errors.title.message}</span>}
      </label>

      <label className={styles.formLabel}>
        عنوان صفت خودرو:
        <input type="text" {...register('subtitle')} className={styles.formInput} />
        {errors.subtitle && <span className={styles.formError}>{errors.subtitle.message}</span>}
      </label>

      <label className={styles.formLabel}>
        توضیحات:
        <textarea {...register('description')} className={styles.formInput} />
        {errors.description && <span className={styles.formError}>{errors.description.message}</span>}
      </label>

      <label className={styles.formLabel}>
        انتخاب خودرو:
        <select {...register('carId')} className={styles.formSelect}>
          <option value="">انتخاب کنید</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>
        {errors.carId && <span className={styles.formError}>{errors.carId.message}</span>}
      </label>

      <label className={styles.formLabel}>
        انتخاب بخش:
        <select {...register('sectionId')} className={styles.formSelect}>
          <option value="">انتخاب کنید</option>
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>
        {errors.sectionId && <span className={styles.formError}>{errors.sectionId.message}</span>}
      </label>

      <button type="submit" className={styles.formButton}>
        {isEdit ? 'ویرایش' : 'ایجاد'}
      </button>
      <button type="button" onClick={handleCancel} className={styles.formButton}>
        لغو
      </button>
    </form>
  )
}
