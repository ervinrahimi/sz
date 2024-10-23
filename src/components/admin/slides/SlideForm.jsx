'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { slideSchema } from '@/security/zod/validationSchema'
import { createSlide, updateSlide } from '@/actions/admin/slides'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import styles from '@/styles/form.module.css'
import { useState } from 'react'

export default function SlideForm({ slide }) {
  const isEdit = !!slide
  const [imagePreview, setImagePreview] = useState(slide ? slide.imageUrl : '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // تعریف فرم با react-hook-form و zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(slideSchema),
    defaultValues: {
      title: slide ? slide.title : '',
      typeAnimationTexts: slide ? slide.typeAnimation.join('\n') : '',
    },
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)

    let imageUrl = slide ? slide.imageUrl : ''

    // آپلود تصویر
    if (data.imageFile && data.imageFile.length > 0) {
      const formData = new FormData()
      formData.append('file', data.imageFile[0])

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const uploadData = await res.json()
      imageUrl = uploadData.url
    }

    const submitData = {
      title: data.title,
      imageUrl,
      typeAnimation: data.typeAnimationTexts.split('\n'), // تبدیل رشته به آرایه
    }

    try {
      if (isEdit) {
        await updateSlide({ ...submitData, id: slide.id })
      } else {
        await createSlide(submitData)
      }
      router.push('/admin/slides')
    } catch (error) {
      alert(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setValue('imageFile', e.target.files) // استفاده از setValue برای بروزرسانی تصویر
      setImagePreview(URL.createObjectURL(file))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <label className={styles.formInput}>
        عنوان اسلاید:
        <input className={styles.formInput} type="text" {...register('title')} required />
        {errors.title && <p className={styles.formError}>{errors.title.message}</p>}
      </label>
      <label className={styles.formInput}>
        تصویر پس‌زمینه:
        <input
          className={styles.formFile}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          {...register('imageFile')}
          required={!isEdit}
        />
      </label>
      {imagePreview && (
        <Image
          src={imagePreview}
          alt="پیش‌نمایش تصویر"
          className={styles.preview}
          width={100}
          height={100}
        />
      )}
      <label className={styles.formInput}>
        متون برای TypeAnimation (هر خط یک متن جدید):
        <textarea
          className={styles.formInput}
          {...register('typeAnimationTexts')}
          placeholder="متن خود را بنویسید..."
          rows={4}
        />
        {errors.typeAnimationTexts && (
          <p className={styles.formError}>{errors.typeAnimationTexts.message}</p>
        )}
      </label>
      <button className={styles.formButton} type="submit" disabled={isSubmitting}>
        {isEdit ? 'ویرایش اسلاید' : 'ساختن اسلاید'}
      </button>
    </form>
  )
}
