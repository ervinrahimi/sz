// src/components/admin/cardBoxes/CardBoxForm.jsx

'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCardBox, updateCardBox, deleteCatalogFile } from '@/actions/admin/cardBoxes'
import { cardBoxSchema } from '@/security/zod/validationSchema'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import styles from '@/styles/form.module.css'
import Image from 'next/image'

export default function CardBoxForm({ cardBox, cars, sections }) {
  const isEdit = !!cardBox
  const router = useRouter()
  const [catalogFile, setCatalogFile] = useState(null)
  const [hasCatalog, setHasCatalog] = useState(!!cardBox?.catalogUrl)
  const [previewUrl, setPreviewUrl] = useState(cardBox?.catalogUrl || null)

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
      setValue('price', cardBox.price)
      setValue('carId', cardBox.carId)
      setValue('sectionId', cardBox.sectionId)
    }
  }, [isEdit, cardBox, setValue])

  const handleCatalogChange = (e) => {
    const file = e.target.files[0]
    setCatalogFile(file)
    if (file && file.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(file)) // نمایش پیش‌نمایش برای تصاویر
    } else {
      setPreviewUrl(null) // عدم نمایش پیش‌نمایش برای فایل‌های غیرتصویری
    }
  }

  const handleCatalogDelete = async () => {
    try {
      await deleteCatalogFile(cardBox.id)
      setHasCatalog(false)
      setPreviewUrl(null)
      setCatalogFile(null)
      toast.success('کاتالوگ با موفقیت حذف شد')
    } catch (error) {
      toast.error('حذف کاتالوگ با مشکل مواجه شد')
    }
  }

  const onSubmit = async (data) => {
    const formData = new FormData()
    Object.keys(data).forEach((key) => formData.append(key, data[key]))
    if (catalogFile) {
      formData.append('catalogFile', catalogFile)
    }

    if (isEdit) {
      await updateCardBox(cardBox.id, formData)
      toast.success('کارت باکس شما با موفقیت ویرایش شد', { duration: 5000 })
    } else {
      await createCardBox(formData)
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
        {errors.description && (
          <span className={styles.formError}>{errors.description.message}</span>
        )}
      </label>

      <label className={styles.formLabel}>
        قیمت:
        <input
          type="number"
          {...register('price', { valueAsNumber: true })}
          className={styles.formInput}
        />
        {errors.price && <span className={styles.formError}>{errors.price.message}</span>}
      </label>

      <label className={styles.formLabel}>
        انتخاب خودرو:
        <select {...register('carId')} className={styles.formInput}>
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
        <select {...register('sectionId')} className={styles.formInput}>
          <option value="">انتخاب کنید</option>
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>
        {errors.sectionId && <span className={styles.formError}>{errors.sectionId.message}</span>}
      </label>

      <label className={styles.formLabel}>
        آپلود کاتالوگ:
        <input type="file" onChange={handleCatalogChange} accept="image/*,application/pdf" />
      </label>

      {/* نمایش فایل آپلود شده */}
      {previewUrl && (
        <div className={styles.filePreviewContainer}>
          {previewUrl.endsWith('.pdf') ? (
            <div className={styles.fileInfoContainer}>
              <span>📄</span> {/* آیکن فایل PDF */}
              <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                {catalogFile ? catalogFile.name : 'کاتالوگ فعلی'}
              </a>
              <button type="button" onClick={handleCatalogDelete} className={styles.deleteButton}>
                حذف کاتالوگ
              </button>
            </div>
          ) : (
            <div className={styles.fileInfoContainer}>
              <Image src={previewUrl} alt="پیش‌نمایش کاتالوگ" className={styles.previewImage} />
              <button type="button" onClick={handleCatalogDelete} className={styles.deleteButton}>
                حذف کاتالوگ
              </button>
            </div>
          )}
        </div>
      )}

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.formButton}>
          {isEdit ? 'ویرایش' : 'ایجاد'}
        </button>
        <button type="button" onClick={handleCancel} className={styles.formButton}>
          لغو
        </button>
      </div>
    </form>
  )
}
