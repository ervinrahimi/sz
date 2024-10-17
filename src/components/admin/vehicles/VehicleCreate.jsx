'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { vehicleSchema } from '@/security/zod/validationSchema' // فایل Zod مربوط به ولیدیشن خودرو
import { createVehicle } from '@/actions/admin/vehicles'
import { useRouter } from 'next/navigation'
import styles from '@/styles/form.module.css'

export default function VehicleCreate() {
  const router = useRouter()

  // استفاده از useForm با resolver zod
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      model: '',
      name: '',
      image: '',
      status: 'AVAILABLE',
      appearanceSpecifications: [{ title: '', options: [], isSelectable: true }],
      technicalSpecifications: [{ key: '', value: '', note: '' }],
    },
  })

  // مدیریت فیلدهای داینامیک با useFieldArray
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
    const res = await createVehicle(data)
    if (res.success) {
      reset()
      router.push('/admin/vehicles')
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
        <label className={styles.formLabel}>
          تصویر:
          <input type="text" {...register('image')} className={styles.formInput} />
          {errors.image && <p className={styles.formError}>{errors.image.message}</p>}
        </label>
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
            {spec.options.map((option, optIndex) => (
              <div key={optIndex} className={styles.optionContainer}>
                <input
                  type="text"
                  {...register(`appearanceSpecifications.${index}.options.${optIndex}`)}
                  className={styles.formInput}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendAppearance({ title: '', options: [], isSelectable: true })}
              className={styles.formButton}
            >
              افزودن مقدار
            </button>
            <button
              type="button"
              onClick={() => removeAppearance(index)}
              className={styles.formButton}
            >
              حذف مشخصه
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
              className={styles.formButton}
            >
              حذف مشخصه
            </button>
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
