'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { slideSchema } from '@/security/zod/validationSchema'
import { createSlide, updateSlide } from '@/actions/admin/slides'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import styles from '@/styles/form.module.css'

export default function SlideForm({ slide }) {
  const isEdit = !!slide
  const [imagePreview, setImagePreview] = useState(slide ? slide.imageUrl : '')
  const [removeImage, setRemoveImage] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

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

    if (removeImage) {
      imageUrl = ''
    }

    if (!removeImage && data.imageFile && data.imageFile.length > 0) {
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
      typeAnimation: data.typeAnimationTexts.split('\n'),
    }

    try {
      if (isEdit) {
        await updateSlide({ ...submitData, id: slide.id })
        toast.success('اسلاید با موفقیت ویرایش شد', { duration: 5000 })
      } else {
        await createSlide(submitData)
        toast.success('اسلاید جدید با موفقیت ساخته شد', { duration: 5000 })
      }
      router.push('/admin/slides')
    } catch (error) {
      toast.error('خطایی رخ داد: ' + error.message, { duration: 5000 })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setRemoveImage(false)
      setValue('imageFile', e.target.files)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <label className={styles.formInput}>
        عنوان اسلاید:
        <input className={styles.formInput} type="text" {...register('title')} />
        {errors.title && <p className={styles.formError}>{errors.title.message}</p>}
      </label>

      <label className={styles.formInput}>
        تصویر پس‌زمینه:
        <input
          className={styles.formFile}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {errors.imageFile && <p className={styles.formError}>{errors.imageFile.message}</p>}
      </label>

      {imagePreview && !removeImage && (
        <div>
          <Image
            src={imagePreview}
            alt="پیش‌نمایش تصویر"
            className={styles.preview}
            width={100}
            height={100}
          />
          <button type="button" onClick={() => setRemoveImage(true)}>
            حذف تصویر
          </button>
        </div>
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
