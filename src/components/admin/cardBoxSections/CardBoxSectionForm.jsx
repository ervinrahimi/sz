// src/components/admin/cardBoxSections/CardBoxSectionForm.jsx

'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCardBoxSection, updateCardBoxSection } from '@/actions/admin/cardBoxSections'
import { cardBoxSectionSchema } from '@/security/zod/validationSchema'
import { useRouter } from 'next/navigation'
import styles from './CardBoxSectionForm.module.css'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function CardBoxSectionForm({ section }) {
  const isEdit = !!section
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(cardBoxSectionSchema),
  })

  useEffect(() => {
    if (isEdit) {
      setValue('name', section.name)
      setValue('subtitle', section.subtitle)
    }
  }, [isEdit, section, setValue])

  const onSubmit = async (data) => {
    if (isEdit) {
      await updateCardBoxSection(section.id, data)
      toast.success('بخش شما با موفقیت ویرایش شد', { duration: 5000 })
    } else {
      await createCardBoxSection(data)
      toast.success('بخش شما با موفقیت ساخته شد', { duration: 5000 })
    }
    router.push('/admin/card-box-sections')
  }

  const handleCancel = () => {
    router.push('/admin/card-box-sections')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label>
        نام بخش:
        <input type="text" {...register('name')} />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
      </label>

      <label>
        زیرعنوان:
        <input type="text" {...register('subtitle')} />
        {errors.subtitle && <span className={styles.error}>{errors.subtitle.message}</span>}
      </label>

      <button type="submit">{isEdit ? 'ویرایش' : 'ایجاد'}</button>
      <button type="button" onClick={handleCancel}>
        لغو
      </button>
    </form>
  )
}
