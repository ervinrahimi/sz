'use client'

import { createCardBox, updateCardBox, deleteCatalogFile, deleteImageFile } from '@/actions/admin/cardBoxes'
import { cardBoxSchema } from '@/security/zod/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function CardBoxForm({ cardBox, cars, sections }) {
  const isEdit = !!cardBox
  const router = useRouter()
  const [catalogFile, setCatalogFile] = useState(null)
  const [hasCatalog, setHasCatalog] = useState(!!cardBox?.catalogUrl)
  const [previewUrl, setPreviewUrl] = useState(cardBox?.catalogUrl || null)

  const [imageFile, setImageFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(cardBox?.imageUrl || null)

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

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
    if (file && file.type.startsWith('image/')) {
      setImagePreviewUrl(URL.createObjectURL(file))
    } else {
      setImagePreviewUrl(null)
    }
  }

  const handleImageDelete = async () => {
    try {
      await deleteImageFile(cardBox.id)
      setImagePreviewUrl(null)
      setImageFile(null)
      toast.success('تصویر با موفقیت حذف شد')
    } catch (error) {
      toast.error('حذف تصویر با مشکل مواجه شد')
    }
  }

  const onSubmit = async (data) => {
    // آپلود تصویر در صورت وجود
    let newImageUrl = null
    if (imageFile) {
      const formData = new FormData()
      formData.append('imageFile', imageFile)

      const res = await fetch('/api/upload/cardbox', { method: 'POST', body: formData })
      const uploadData = await res.json()
      newImageUrl = uploadData.url
    }

    // آپلود کاتالوگ در صورت وجود
    let newCatalogUrl = null
    if (catalogFile) {
      const formData = new FormData()
      formData.append('catalogFile', catalogFile)

      const res = await fetch('/api/upload/cardbox-catalog', { method: 'POST', body: formData })
      const uploadData = await res.json()
      newCatalogUrl = uploadData.url
    }

    // آماده‌سازی داده‌ها برای ارسال به اکشن
    const cardBoxData = {
      ...data,
      imageUrl: newImageUrl || cardBox?.imageUrl,
      catalogUrl: newCatalogUrl || cardBox?.catalogUrl,
    }

    if (isEdit) {
      await updateCardBox(cardBox.id, cardBoxData)
      toast.success('کارت باکس شما با موفقیت ویرایش شد', { duration: 5000 })
    } else {
      await createCardBox(cardBoxData)
      toast.success('کارت باکس شما با موفقیت ساخته شد', { duration: 5000 })
    }
    router.push('/admin/card-boxes')
  }

  const handleCancel = () => {
    router.push('/admin/card-boxes')
  }

  return (
    <form className={`formContainer`} onSubmit={handleSubmit(onSubmit)}>
      <div className={`labelGroup`}>
        <label className={`formLabel`}>
          عنوان کارت باکس:
          <input type="text" {...register('title')} className={`formInput`} />
          {errors.title && <span className={`formError`}>{errors.title.message}</span>}
        </label>

        <label className={`formLabel`}>
          عنوان صفت خودرو:
          <input type="text" {...register('subtitle')} className={`formInput`} />
          {errors.subtitle && <span className={`formError`}>{errors.subtitle.message}</span>}
        </label>
      </div>

      <label className={`formLabel`}>
        توضیحات:
        <textarea {...register('description')} className={`formInputArea`} />
        {errors.description && <span className={`formError`}>{errors.description.message}</span>}
      </label>

      <label className={`formLabel`}>
        قیمت:
        <input
          type="number"
          {...register('price', { valueAsNumber: true })}
          className={`formInput`}
        />
        {errors.price && <span className={`formError`}>{errors.price.message}</span>}
      </label>
      <div className={`labelGroup`}>
        <label className={`formLabel`}>
          انتخاب خودرو:
          <select {...register('carId')} className={`formSelect`}>
            <option value="">انتخاب کنید</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.name}
              </option>
            ))}
          </select>
          {errors.carId && <span className={`formError`}>{errors.carId.message}</span>}
        </label>

        <label className={`formLabel`}>
          انتخاب بخش:
          <select {...register('sectionId')} className={`formSelect`}>
            <option value="">انتخاب کنید</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>
          {errors.sectionId && <span className={`formError`}>{errors.sectionId.message}</span>}
        </label>
      </div>

      {/* آپلود تصویر */}
      <label className={`formLabel`}>
        آپلود تصویر:
        <input
          type="file"
          className={`formFile`}
          onChange={handleImageChange}
          accept="image/*"
        />
      </label>

      {/* نمایش پیش‌نمایش تصویر */}
      {imagePreviewUrl && (
        <div className={`filePreviewContainer`}>
          <div className={`fileInfoContainer`}>
            <Image
              src={imagePreviewUrl}
              alt="پیش‌نمایش تصویر"
              className={`previewImage`}
              width={300}
              height={200}
            />
            <button type="button" onClick={handleImageDelete} className={`deleteButton`}>
              حذف تصویر
            </button>
          </div>
        </div>
      )}

      {/* آپلود کاتالوگ */}
      <label className={`formLabel`}>
        آپلود کاتالوگ:
        <input
          type="file"
          className={`formFile`}
          onChange={handleCatalogChange}
          accept="image/*,application/pdf"
        />
      </label>

      {/* نمایش فایل کاتالوگ آپلود شده */}
      {previewUrl && (
        <div className={`filePreviewContainer`}>
          {previewUrl.endsWith('.pdf') ? (
            <div className={`fileInfoContainer`}>
              <span>📄</span>
              <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                {catalogFile ? catalogFile.name : 'کاتالوگ فعلی'}
              </a>
              <button type="button" onClick={handleCatalogDelete} className={`deleteButton`}>
                حذف کاتالوگ
              </button>
            </div>
          ) : (
            <div className={`fileInfoContainer`}>
              <Image
                src={previewUrl}
                alt="پیش‌نمایش کاتالوگ"
                className={`previewImage`}
                width={1400}
                height={1400}
              />
              <button type="button" onClick={handleCatalogDelete} className={`deleteButton`}>
                حذف کاتالوگ
              </button>
            </div>
          )}
        </div>
      )}

      <div className={`buttonGroup`}>
        <button type="submit" className={`formButton`}>
          {isEdit ? 'ویرایش' : 'ایجاد'}
        </button>
        <button type="button" onClick={handleCancel} className={`formButton`}>
          لغو
        </button>
      </div>
    </form>
  )
}
