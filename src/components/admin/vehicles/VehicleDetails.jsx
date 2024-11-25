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
  const [imageFiles, setImageFiles] = useState(vehicle.image || []) // شامل تصاویر موجود
  const [imagePreviews, setImagePreviews] = useState(vehicle.image || [])

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
        { title: '', value: '', note: '' },
      ],
      technicalSpecifications: vehicle.technicalSpecifications || [
        { key: '', value: '', note: '' },
      ],
      comfortFeatures: vehicle.comfortFeatures || [
        { featureName: '', description: ''},
      ],
      safetyFeatures: vehicle.safetyFeatures || [
        { featureName: '', description: ''},
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

  const {
    fields: comfortFields,
    append: appendComfort,
    remove: removeComfort,
  } = useFieldArray({
    control,
    name: 'comfortFeatures',
  })

  const {
    fields: safetyFields,
    append: appendSafety,
    remove: removeSafety,
  } = useFieldArray({
    control,
    name: 'safetyFeatures',
  })

  const onSubmit = async (data) => {
    const newImageUrls = []
    const imagesToUpload = []

    imageFiles.forEach((fileOrUrl) => {
      if (typeof fileOrUrl === 'string') {
        // تصویر موجود (URL)
        newImageUrls.push(fileOrUrl)
      } else {
        // تصویر جدید (File)
        imagesToUpload.push(fileOrUrl)
      }
    })

    // آپلود تصاویر جدید در صورت وجود
    if (imagesToUpload.length > 0) {
      const formData = new FormData()
      imagesToUpload.forEach((file) => formData.append('files', file))

      const res = await fetch('/api/upload/car', { method: 'POST', body: formData })
      const uploadData = await res.json()

      // اضافه کردن URLهای آپلود شده به newImageUrls
      newImageUrls.push(...uploadData.urls)
    }

    // پیدا کردن تصاویر برای حذف
    const existingImageUrls = vehicle.image || []
    const imagesToDelete = existingImageUrls.filter((url) => !newImageUrls.includes(url))

    if (imagesToDelete.length > 0) {
      await fetch('/api/deleteImages', {
        method: 'POST',
        body: JSON.stringify({ urls: imagesToDelete }),
        headers: { 'Content-Type': 'application/json' },
      })
    }

    data.image = newImageUrls
    data.id = vehicle.id

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
      setImageFiles((prevFiles) => {
        const newFiles = [...prevFiles]
        ;[newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]]
        return newFiles
      })
      setImagePreviews((prevPreviews) => {
        const newPreviews = [...prevPreviews]
        ;[newPreviews[index - 1], newPreviews[index]] = [newPreviews[index], newPreviews[index - 1]]
        return newPreviews
      })
    }
  }

  const moveImageDown = (index) => {
    if (index < imageFiles.length - 1) {
      setImageFiles((prevFiles) => {
        const newFiles = [...prevFiles]
        ;[newFiles[index + 1], newFiles[index]] = [newFiles[index], newFiles[index + 1]]
        return newFiles
      })
      setImagePreviews((prevPreviews) => {
        const newPreviews = [...prevPreviews]
        ;[newPreviews[index + 1], newPreviews[index]] = [newPreviews[index], newPreviews[index + 1]]
        return newPreviews
      })
    }
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length) {
      const newPreviews = files.map((file) => URL.createObjectURL(file))
      setImageFiles((prevFiles) => [...prevFiles, ...files])
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews])
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
    <form onSubmit={handleSubmit(onSubmit)} className={`formContainer`}>
      <div className={`labelGroup`}>
        <label className={`formLabel`}>
          مدل:
          <input type="text" {...register('model')} className={`formInput`} />
          {errors.model && <p className={`formError`}>{errors.model.message}</p>}
        </label>
        <label className={`formLabel`}>
          نام:
          <input type="text" {...register('name')} className={`formInput`} />
          {errors.name && <p className={`formError`}>{errors.name.message}</p>}
        </label>
      </div>
      <label className={`formLabel`}>
        تصویر خودرو:
        <input
          className={`formFile`}
          type="file"
          accept="image/*"
          multiple // اجازه آپلود چندین تصویر
          onChange={handleImageChange}
        />
        <p>نکته: تصویر اول به عنوان تصویر اصلی قرار می‌گیرد!</p>
        {/* نمایش خطای تصویر در صورت وجود */}
        {errors.imageFile && <p className={`formError`}>{errors.imageFile.message}</p>}
      </label>

      <div className={`imagePreviewContainer`}>
        {imagePreviews.map((preview, index) => (
          <div key={index} className={`imagePreviewWrapper`}>
            <Image
              src={preview}
              alt={`پیش‌نمایش تصویر ${index + 1}`}
              className={`preview`}
              width={1400}
              height={1400}
              quality={100}
            />
            <button type="button" className={`deleteButton`} onClick={() => removeImage(index)}>
              حذف تصویر
            </button>
            <button
              type="button"
              className={`moveButton`}
              onClick={() => moveImageUp(index)}
              disabled={index === 0}
            >
              بالا
            </button>
            <button
              className={`moveButton`}
              type="button"
              onClick={() => moveImageDown(index)}
              disabled={index === imagePreviews.length - 1}
            >
              پایین
            </button>
          </div>
        ))}
      </div>

      <label className={`formLabel`}>
        وضعیت:
        <select {...register('status')} className={`formSelect`}>
          <option value="AVAILABLE">موجود</option>
          <option value="UNAVAILABLE">ناموجود</option>
        </select>
      </label>

      <h3 className={`subtitle`}>مشخصات ظاهری</h3>
      {appearanceFields.map((spec, index) => (
        <div key={spec.id} className={`labelGroup`}>
          <label className={`formLabel`}>
            عنوان:
            <input
              type="text"
              {...register(`appearanceSpecifications.${index}.title`)}
              className={`formInput`}
            />
          </label>
          <label className={`formLabel`}>
            مقدار:
            <input
              type="text"
              {...register(`appearanceSpecifications.${index}.value`)}
              className={`formInput`}
            />
          </label>
          <label className={`formLabel`}>
            یادداشت:
            <input
              type="text"
              {...register(`appearanceSpecifications.${index}.note`)}
              className={`formInput`}
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
        onClick={() => appendAppearance({ title: '', value: '', note: '' })}
        className={`formButton`}
      >
        افزودن مشخصات ظاهری
      </button>

      <h3 className={styles.subtitle}>مشخصات فنی</h3>
      {technicalFields.map((spec, index) => (
        <div key={spec.id} className={`labelGroup`}>
          <label className={`formLabel`}>
            ویژگی:
            <input
              type="text"
              {...register(`technicalSpecifications.${index}.key`)}
              className={`formInput`}
            />
            {errors.technicalSpecifications?.[index]?.key && (
              <p className={`formError`}>{errors.technicalSpecifications[index].key.message}</p>
            )}
          </label>
          <label className={`formLabel`}>
            مقدار:
            <input
              type="text"
              {...register(`technicalSpecifications.${index}.value`)}
              className={`formInput`}
            />
            {errors.technicalSpecifications?.[index]?.value && (
              <p className={`formError`}>{errors.technicalSpecifications[index].value.message}</p>
            )}
          </label>
          <label className={`formLabel`}>
            یادداشت:
            <input
              type="text"
              {...register(`technicalSpecifications.${index}.note`)}
              className={`formInput`}
            />
          </label>

          {index > 0 && (
            <button type="button" onClick={() => removeTechnical(index)} className={`deleteButton`}>
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

      <h3 className={styles.subtitle}>امکانات رفاهی</h3>
      {comfortFields.map((feature, index) => (
        <div key={feature.id} className={`labelGroup`}>
          <label className={`formLabel`}>
            نام ویژگی:
            <input
              type="text"
              {...register(`comfortFeatures.${index}.featureName`)}
              className={`formInput`}
            />
            {errors.comfortFeatures?.[index]?.featureName && (
              <p className={`formError`}>{errors.comfortFeatures[index].featureName.message}</p>
            )}
          </label>
          <label className={`formLabel`}>
            توضیحات:
            <input
              type="text"
              {...register(`comfortFeatures.${index}.description`)}
              className={`formInput`}
            />
          </label>
          {index > 0 && (
            <button type="button" onClick={() => removeComfort(index)} className={`deleteButton`}>
              حذف
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => appendComfort({ featureName: '', description: '' })}
        className={`formButton`}
      >
        افزودن امکانات رفاهی
      </button>

      <h3 className={styles.subtitle}>امکانات ایمنی</h3>
      {safetyFields.map((feature, index) => (
        <div key={feature.id} className={`labelGroup`}>
          <label className={`formLabel`}>
            نام ویژگی:
            <input
              type="text"
              {...register(`safetyFeatures.${index}.featureName`)}
              className={`formInput`}
            />
            {errors.safetyFeatures?.[index]?.featureName && (
              <p className={`formError`}>{errors.safetyFeatures[index].featureName.message}</p>
            )}
          </label>
          <label className={`formLabel`}>
            توضیحات:
            <input
              type="text"
              {...register(`safetyFeatures.${index}.description`)}
              className={`formInput`}
            />
          </label>
          {index > 0 && (
            <button type="button" onClick={() => removeSafety(index)} className={`deleteButton`}>
              حذف
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => appendSafety({ featureName: '', description: '' })}
        className={`formButton`}
      >
        افزودن امکانات ایمنی
      </button>

      <div className={styles.actions}>
        <button type="submit" className={styles.formButton}>
          ذخیره
        </button>
        <button type="button" className={styles.formButton} onClick={handleCancel}>
          لغو
        </button>
      </div>
    </form>
  )
}
