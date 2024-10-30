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
  const [imagePreview, setImagePreview] = useState('')

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
      imageFile: '', // تغییر داده شده به `imageFile`
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

  // استفاده از toast با تنظیم duration برای ماندگاری بیشتر در صفحه
  const onSubmit = async (data) => {
    if (data.imageFile && data.imageFile.length > 0) {
      const formData = new FormData()
      formData.append('file', data.imageFile[0])

      const res = await fetch('/api/upload/car', {
        method: 'POST',
        body: formData,
      })

      const uploadData = await res.json()
      data.imageFile = uploadData.url
    }

    const res = await createVehicle(data)

    if (res.success) {
      reset()
      toast.success('خودرو شما با موفقیت اضافه شد!', { duration: 5000 }) // تنظیم مدت زمان به ۵ ثانیه
      router.push('/admin/vehicles')
      router.refresh()
    } else {
      toast.error('مشکلی در ایجاد خودرو پیش آمد!', { duration: 5000 }) // تنظیم مدت زمان به ۵ ثانیه
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setValue('imageFile', e.target.files)
      setImagePreview(URL.createObjectURL(file))
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
            onChange={handleImageChange}
          />
          {/* نمایش خطای تصویر در صورت وجود */}
          {errors.imageFile && <p className={styles.formError}>{errors.imageFile.message}</p>}
        </label>

        {imagePreview && (
          <div>
            <Image
              src={imagePreview}
              alt="پیش‌نمایش تصویر"
              className={styles.preview}
              width={100}
              height={100}
            />
            <button
              type="button"
              onClick={() => {
                setImagePreview('')
                setValue('imageFile', '')
              }}
            >
              حذف تصویر
            </button>
          </div>
        )}

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
