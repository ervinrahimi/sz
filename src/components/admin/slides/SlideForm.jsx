// src/components/admin/slides/SlideForm.jsx

'use client'

import { useState } from 'react'
import { createSlide, updateSlide } from '@/actions/admin/slides'
import { useRouter } from 'next/navigation'
import styles from './SlideForm.module.css'

export default function SlideForm({ slide }) {
  const isEdit = !!slide
  const [title, setTitle] = useState(slide ? slide.title : '')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(slide ? slide.imageUrl : '')
  const [typeAnimationTexts, setTypeAnimationTexts] = useState(
    slide ? slide.typeAnimation.join('\n') : ''
  ) // اضافه کردن متون انیمیشن
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    let imageUrl = slide ? slide.imageUrl : ''

    // آپلود تصویر
    if (imageFile) {
      const formData = new FormData()
      formData.append('file', imageFile)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      imageUrl = data.url
    }

    const data = {
      title,
      imageUrl,
      typeAnimation: typeAnimationTexts.split('\n'), // تبدیل رشته به آرایه
    }

    try {
      if (isEdit) {
        await updateSlide({ ...data, id: slide.id })
      } else {
        await createSlide(data)
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
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        عنوان اسلاید:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        تصویر پس‌زمینه:
        <input type="file" accept="image/*" onChange={handleImageChange} required={!isEdit} />
      </label>
      {imagePreview && <img src={imagePreview} alt="پیش‌نمایش تصویر" className={styles.preview} />}
      <label>
        متون برای TypeAnimation (هر خط یک متن جدید):
        <textarea
          value={typeAnimationTexts}
          onChange={(e) => setTypeAnimationTexts(e.target.value)}
          placeholder="متن خود را بنویسید..."
          rows={4}
        />
      </label>
      <button type="submit" disabled={isSubmitting}>
        {isEdit ? 'ویرایش اسلاید' : 'ساختن اسلاید'}
      </button>
    </form>
  )
}
