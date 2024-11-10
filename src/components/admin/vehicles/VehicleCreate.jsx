'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { vehicleSchema } from '@/security/zod/validationSchema'
import { createVehicle } from '@/actions/admin/vehicles'
import { useRouter } from 'next/navigation'
import styles from '@/styles/form.module.css'
import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

export default function VehicleCreate() {
  const router = useRouter()
  const [imageFiles, setImageFiles] = useState([]) // مدیریت فایل‌ها به عنوان آرایه
  const [imagePreviews, setImagePreviews] = useState([]) // پیش‌نمایش تصاویر

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
      model: '',
      name: '',
      imageFiles: [], // تغییر داده شده به `imageFiles`
      status: 'AVAILABLE',
      appearanceSpecifications: [{ title: '', options: [], isSelectable: true }],
      technicalSpecifications: [{ key: '', value: '', note: '' }],
    },
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length) {
      const newPreviews = files.map((file) => URL.createObjectURL(file))
      setImageFiles((prevFiles) => [...prevFiles, ...files]) // افزودن فایل‌ها به آرایه
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]) // افزودن پیش‌نمایش‌ها به آرایه
    }
  }

  const removeImage = (index) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index))
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

  const onSubmit = async (data) => {
    // اعتبارسنجی دستی برای بررسی اینکه حداقل یک تصویر وجود دارد
    if (imageFiles.length === 0) {
      toast.error('لطفاً حداقل یک تصویر انتخاب کنید!', { duration: 5000 })
      return
    }

    const formData = new FormData()
    imageFiles.forEach((file) => formData.append('files', file))

    const res = await fetch('/api/upload/car', { method: 'POST', body: formData })
    const uploadData = await res.json()

    // اضافه کردن URLهای آپلود شده به داده‌های فرم
    data.imageFiles = uploadData.urls

    const response = await createVehicle(data)

    if (response.success) {
      reset()
      toast.success('خودرو شما با موفقیت اضافه شد!', { duration: 5000 })
      router.push('/admin/vehicles')
      router.refresh()
    } else {
      toast.error('مشکلی در ایجاد خودرو پیش آمد!', { duration: 5000 })
    }
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
            multiple // اجازه آپلود چندین تصویر
            onChange={handleImageChange}
          />
          <p>نکته: تصویر اول به عنوان تصویر اصلی قرار می‌گیرد!</p>
          {errors.imageFiles && <p className={styles.formError}>{errors.imageFiles.message}</p>}
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
              <button type="button" className={styles.deleteButton}  onClick={() => removeImage(index)}>
                حذف تصویر
              </button>
              <button type="button"  className={styles.moveButton } onClick={() => moveImageUp(index)} disabled={index === 0}>
                بالا
              </button>
              <button
                type="button"
                className={styles.moveButton }
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

        <button type="submit" className={styles.formButton}>
          ایجاد خودرو
        </button>
      </form>
    </div>
  )
}
