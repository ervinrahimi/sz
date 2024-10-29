// src/components/admin/MenuForm.jsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { menuItemSchema } from '@/security/zod/validationSchema'
import { addMenuItem, getMenuItems } from '@/actions/admin/menu'
import styles from '@/styles/form.module.css'
import { useRouter } from 'next/navigation'

export default function MenuForm() {
  const [menuOptions, setMenuOptions] = useState([])
  const router = useRouter()

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
    data.order = menuOptions.length
    if (data.link && !data.link.startsWith('/')){
      data.link = `/${data.link}`
    }
    await addMenuItem(data)
    reset() // ریست فرم
    router.push('/admin/menu') // رفرش صفحه
    return router.refresh()
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
          className={`${styles.formInput} ${styles.formLtr}`}
        />
        {errors.link && <p className={styles.formError}>{errors.link.message}</p>}
      </label>

      <label className={styles.formLabel}>
        والد (اختیاری):
        <select
          {...register('parentMenuID')}
          className={styles.formSelect}
        >
          <option value="">به زودی...</option>
          {/* {menuOptions.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.title}
            </option>
          ))} */}
        </select>
      </label>

      <button type="submit" className={styles.formButton}>افزودن منو</button>
    </form>
  )
}
