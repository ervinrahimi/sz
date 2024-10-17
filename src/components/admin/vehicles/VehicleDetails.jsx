// src/components/admin/vehicles/VehicleDetails.jsx
'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { vehicleSchema } from '@/security/zod/validationSchema'
import styles from '@/styles/form.module.css'
import { updateVehicle } from '@/actions/admin/vehicles'
import { useState } from 'react'

export default function VehicleDetails({ vehicle }) {
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      model: vehicle.model || '',
      name: vehicle.name || '',
      status: vehicle.status || 'AVAILABLE',
      appearanceSpecifications: vehicle.appearanceSpecifications || [],
      technicalSpecifications: vehicle.technicalSpecifications || [],
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

  const onSubmit = async (data) => {
    const res = await updateVehicle(data)
    if (res.success) {
      reset(data)
      setMessage('اطلاعات با موفقیت به‌روزرسانی شد.')
    } else {
      setMessage(res.message || 'خطا در به‌روزرسانی اطلاعات.')
    }
  }

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>جزئیات خودرو</h2>
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
        <label className={styles.formLabel}>
          وضعیت:
          <select {...register('status')} className={styles.formSelect}>
            <option value="AVAILABLE">موجود</option>
            <option value="UNAVAILABLE">ناموجود</option>
          </select>
          {errors.status && <p className={styles.formError}>{errors.status.message}</p>}
        </label>

        {/* ویرایش مشخصات ظاهری */}
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
                className={styles.formCheckbox}
              />
            </label>

            {/* گزینه‌ها */}
            {spec.options.map((option, optIndex) => (
              <div key={optIndex} className={styles.optionContainer}>
                <input
                  type="text"
                  {...register(`appearanceSpecifications.${index}.options.${optIndex}`)}
                  className={styles.formInput}
                />
                <button
                  type="button"
                  onClick={() => {
                    removeAppearance(index)
                  }}
                  className={styles.removeButton}
                >
                  حذف
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendAppearance({ title: '', options: [], isSelectable: true })}
              className={styles.addButton}
            >
              افزودن مقدار
            </button>
          </div>
        ))}

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
            <button
              type="button"
              onClick={() => removeTechnical(index)}
              className={styles.removeButton}
            >
              حذف مشخصه
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendTechnical({ key: '', value: '', note: '' })}
          className={styles.addButton}
        >
          افزودن مشخصات فنی
        </button>

        <div className={styles.actions}>
          <button type="submit" className={styles.formButton}>
            ذخیره
          </button>
          <button type="button" className={styles.cancelButton} onClick={() => setEditing(false)}>
            لغو
          </button>
        </div>
      </form>
      {message && <p className={styles.formMessage}>{message}</p>}
    </div>
  )
}
