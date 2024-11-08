'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { vehicleSchema } from '@/security/zod/validationSchema'
import styles from '@/styles/form.module.css'
import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { updateVehicle } from '@/actions/admin/vehicles'

export default function VehicleDetails({ vehicle }) {
  const router = useRouter()
  const [imageFiles, setImageFiles] = useState([]) // آرایه فایل‌ها
  const [imagePreviews, setImagePreviews] = useState(vehicle.image || []) // پیش‌نمایش‌های موجود

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      id: vehicle.id || '',
      model: vehicle.model || '',
      name: vehicle.name || '',
      status: vehicle.status || 'AVAILABLE',
      appearanceSpecifications: vehicle.appearanceSpecifications || [
        { title: '', options: [''], isSelectable: true },
      ],
      technicalSpecifications: vehicle.technicalSpecifications || [
        { key: '', value: '', note: '' },
      ],
    },
    mode: 'onChange', // اضافه کردن این خط برای بهبود عملکرد
  })

  const {
    fields: appearanceFields,
    append: appendAppearance,
    remove: removeAppearance,
  } = useFieldArray({
    control,
    name: 'appearanceSpecifications',
  })

  const {
    fields: technicalFields,
    append: appendTechnical,
    remove: removeTechnical,
  } = useFieldArray({
    control,
    name: 'technicalSpecifications',
  })

  const onSubmit = async (data) => {
    // جمع‌آوری URLهای تصاویر جدید و تصاویر موجود در دیتابیس
    const existingImageUrls = vehicle.image || []
    const newImageUrls = []
    const imagesToUpload = []

    // بررسی و جمع‌آوری فایل‌های جدید برای آپلود
    imageFiles.forEach((file, index) => {
      if (typeof file === 'string') {
        // اگر URL باشد، یعنی تصویر قبلی است و نیازی به آپلود مجدد ندارد
        newImageUrls.push(file)
      } else {
        // اگر فایل جدید باشد، باید آپلود شود
        imagesToUpload.push(file)
      }
    })

    // آپلود تصاویر جدید فقط در صورتی که فایل‌های جدید وجود داشته باشند
    if (imagesToUpload.length > 0) {
      const formData = new FormData()
      imagesToUpload.forEach((file) => formData.append('files', file))

      const res = await fetch('/api/upload/car', { method: 'POST', body: formData })
      const uploadData = await res.json()

      // اضافه کردن URLهای تصاویر آپلود شده به لیست
      newImageUrls.push(...uploadData.urls)
    }

    // پیدا کردن و حذف تصاویر از دیتابیس که دیگر در لیست وجود ندارند
    const imagesToDelete = existingImageUrls.filter((url) => !newImageUrls.includes(url))
    if (imagesToDelete.length > 0) {
      // ارسال درخواست حذف به سرور برای پاک کردن تصاویر از دیتابیس
      await fetch('/api/deleteImages', {
        method: 'POST',
        body: JSON.stringify({ urls: imagesToDelete }),
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // تنظیم آرایه تصاویر نهایی
    data.image = newImageUrls
    data.id = vehicle.id // ارسال id به updateVehicle

    const res = await updateVehicle(data)

    if (res.success) {
      reset(data)
      toast.success('اطلاعات با موفقیت به‌روزرسانی شد.', { duration: 5000 })
      router.push('/admin/vehicles/')
      return router.refresh()
    } else {
      toast.error(res.message || 'خطا در به‌روزرسانی اطلاعات.', { duration: 5000 })
    }
  }

  const moveImageUp = (index) => {
    if (index > 0) {
      const newFiles = [...imageFiles]
      const newPreviews = [...imagePreviews]

      // جابه‌جایی آیتم‌ها
      ;[newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]]
      ;[newPreviews[index - 1], newPreviews[index]] = [newPreviews[index], newPreviews[index - 1]]

      setImageFiles(newFiles)
      setImagePreviews(newPreviews)
    }
  }

  const moveImageDown = (index) => {
    if (index < imageFiles.length - 1) {
      const newFiles = [...imageFiles]
      const newPreviews = [...imagePreviews]

      // جابه‌جایی آیتم‌ها
      ;[newFiles[index + 1], newFiles[index]] = [newFiles[index], newFiles[index + 1]]
      ;[newPreviews[index + 1], newPreviews[index]] = [newPreviews[index], newPreviews[index + 1]]

      setImageFiles(newFiles)
      setImagePreviews(newPreviews)
    }
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length) {
      const newPreviews = files.map((file) => URL.createObjectURL(file))
      setImageFiles((prevFiles) => [...prevFiles, ...files]) // افزودن فایل‌ها به آرایه
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]) // افزودن پیش‌نمایش‌ها
    }
  }

  const removeImage = (index) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index))
  }

  const handleCancel = () => {
    reset()
    router.back()
  }

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <label className={styles.formLabel}>
          مدل:
          <input type="text" {...register('model')} className={styles.formInput} />
          {errors.model && <p className={styles.formError}>{errors.model.message}</p>}
        </label>
        <label className={styles.formLabel}>
          نام:
          <input type="text" {...register('name')} className={styles.formInput} />
          {errors.name && <p className={styles.formError}>{errors.name.message}</p>}
        </label>

        <label className={styles.formInput}>
          تصویر خودرو:
          <input
            className={styles.formFile}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {/* نمایش خطای تصویر در صورت وجود */}
          {errors.imageFile && <p className={styles.formError}>{errors.imageFile.message}</p>}
        </label>

        <div className={styles.imagePreviewContainer}>
          {imagePreviews.map((preview, index) => (
            <div key={index} className={styles.imagePreviewWrapper}>
              <Image
                src={preview}
                alt={`پیش‌نمایش تصویر ${index + 1}`}
                className={styles.preview}
                width={100}
                height={100}
              />
              <button type="button" onClick={() => removeImage(index)}>
                حذف تصویر
              </button>
              <button type="button" onClick={() => moveImageUp(index)} disabled={index === 0}>
                بالا
              </button>
              <button
                type="button"
                onClick={() => moveImageDown(index)}
                disabled={index === imagePreviews.length - 1}
              >
                پایین
              </button>
            </div>
          ))}
        </div>

        <label className={styles.formLabel}>
          وضعیت:
          <select {...register('status')} className={styles.formSelect}>
            <option value="AVAILABLE">موجود</option>
            <option value="UNAVAILABLE">ناموجود</option>
          </select>
        </label>

        <h3 className={styles.subtitle}>مشخصات ظاهری</h3>
        {appearanceFields.map((spec, index) => (
          <div key={spec.id} className={styles.specification}>
            <label className={styles.formLabel}>
              عنوان:
              <input
                type="text"
                {...register(`appearanceSpecifications.${index}.title`)}
                className={styles.formInput}
              />
              {errors.appearanceSpecifications?.[index]?.title && (
                <p className={styles.formError}>
                  {errors.appearanceSpecifications[index].title.message}
                </p>
              )}
            </label>
            <label className={styles.formLabel}>
              قابل انتخاب بودن:
              <input
                type="checkbox"
                {...register(`appearanceSpecifications.${index}.isSelectable`)}
                className={styles.checkbox}
              />
            </label>

            {index > 0 && (
              <button
                type="button"
                onClick={() => removeAppearance(index)}
                className={styles.formButton}
              >
                حذف مشخصه
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => appendAppearance({ title: '', options: [], isSelectable: true })}
          className={styles.formButton}
        >
          افزودن مشخصات ظاهری
        </button>

        <h3 className={styles.subtitle}>مشخصات فنی</h3>
        {technicalFields.map((spec, index) => (
          <div key={spec.id} className={styles.specification}>
            <label className={styles.formLabel}>
              ویژگی:
              <input
                type="text"
                {...register(`technicalSpecifications.${index}.key`)}
                className={styles.formInput}
              />
              {errors.technicalSpecifications?.[index]?.key && (
                <p className={styles.formError}>
                  {errors.technicalSpecifications[index].key.message}
                </p>
              )}
            </label>
            <label className={styles.formLabel}>
              مقدار:
              <input
                type="text"
                {...register(`technicalSpecifications.${index}.value`)}
                className={styles.formInput}
              />
              {errors.technicalSpecifications?.[index]?.value && (
                <p className={styles.formError}>
                  {errors.technicalSpecifications[index].value.message}
                </p>
              )}
            </label>
            <label className={styles.formLabel}>
              یادداشت:
              <input
                type="text"
                {...register(`technicalSpecifications.${index}.note`)}
                className={styles.formInput}
              />
            </label>

            {index > 0 && (
              <button
                type="button"
                onClick={() => removeTechnical(index)}
                className={styles.formButton}
              >
                حذف مشخصه
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => appendTechnical({ key: '', value: '', note: '' })}
          className={styles.formButton}
        >
          افزودن مشخصات فنی
        </button>

        <div className={styles.actions}>
          <button type="submit" className={styles.formButton}>
            ذخیره
          </button>
          <button type="button" className={styles.cancelButton} onClick={handleCancel}>
            لغو
          </button>
        </div>
      </form>
    </div>
  )
}
