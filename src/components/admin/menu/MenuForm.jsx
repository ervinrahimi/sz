// src/components/admin/MenuForm.jsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { menuItemSchema } from '@/security/zod/validationSchema'
import { addMenuItem, getMenuItems } from '@/actions/admin/menu'
import styles from '@/styles/form.module.css'

export default function MenuForm() {
  const [menuOptions, setMenuOptions] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      title: '',
      link: '',
      order: 0,
      parentMenuID: null,
    },
  })

  useEffect(() => {
    const fetchMenuItems = async () => {
      const menus = await getMenuItems()
      setMenuOptions(menus)
    }
    fetchMenuItems()
  }, [])

  const onSubmit = async (data) => {
    await addMenuItem(data)
    reset() // ریست فرم
    window.location.reload() // رفرش صفحه
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <label className={styles.formLabel}>
        عنوان منو:
        <input
          type="text"
          {...register('title')}
          className={styles.formInput}
        />
        {errors.title && <p className={styles.formError}>{errors.title.message}</p>}
      </label>
      
      <label className={styles.formLabel}>
        لینک:
        <input
          type="text"
          {...register('link')}
          className={styles.formInput}
        />
      </label>
      
      <label className={styles.formLabel}>
        ترتیب نمایش:
        <input
          type="number"
          {...register('order', { valueAsNumber: true })}
          className={styles.formInput}
        />
        {errors.order && <p className={styles.formError}>{errors.order.message}</p>}
      </label>

      <label className={styles.formLabel}>
        والد (اختیاری):
        <select
          {...register('parentMenuID')}
          className={styles.formSelect}
        >
          <option value="">بدون والد (منوی اصلی)</option>
          {menuOptions.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.title}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" className={styles.formButton}>افزودن منو</button>
    </form>
  )
}
