// src/components/admin/SalesConditionUserManager.jsx
'use client'

import { addAuthorizedUser, removeAuthorizedUser } from '@/actions/admin/sales-conditions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'
import styles from './SalesConditionUserManager.module.css'
import toast from 'react-hot-toast'

// تعریف اسکیمای ولیدیشن با Zod
const userSchema = z.object({
  nationalCode: z
    .string()
    .length(10, 'کد ملی باید ۱۰ رقم باشد.')
    .regex(/^\d+$/, 'کد ملی باید فقط شامل اعداد باشد.'),
  name: z.string().min(1, 'نام الزامی است.'),
  family: z.string().min(1, 'نام خانوادگی الزامی است.'),
})

export default function SalesConditionUserManager({ salesConditionId, initialUsers }) {
  const [authorizedUsers, setAuthorizedUsers] = useState(initialUsers || [])
  const [showPopup, setShowPopup] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { nationalCode: '', name: '', family: '' },
  })

  const openPopup = () => setShowPopup(true)
  const closePopup = () => {
    reset()
    setShowPopup(false)
  }

  const onAddUser = async (data) => {
    const { nationalCode, name, family } = data

    // بررسی تکراری بودن کد ملی
    if (authorizedUsers.some((user) => user.nationalCode === nationalCode)) {
      toast.error('کاربری با این کد ملی قبلاً اضافه شده است.')
      return
    }

    // افزودن کاربر به سرور و لیست
    const newUser = await addAuthorizedUser(salesConditionId, { nationalCode, name, family })
    setAuthorizedUsers((prevUsers) => [...prevUsers, newUser])
    toast.success('کاربر با موفقیت اضافه شد.')
    closePopup()
  }

  const handleRemoveUser = async (userId) => {
    await removeAuthorizedUser(userId)
    setAuthorizedUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
    toast.success('کاربر با موفقیت حذف شد.')
  }

  return (
    <div className={styles.container}>
      <button onClick={openPopup} className={styles.addButton}>
        افزودن کاربر جدید
      </button>
      
      {/* لیست کاربران */}
      <ul className={styles.userList}>
        {authorizedUsers.map((user) => (
          <li key={user.id} className={styles.userItem}>
            <span>{user.name} {user.family} - کد ملی: {user.nationalCode}</span>
            <button
              onClick={() => handleRemoveUser(user.id)}
              className={styles.removeButton}
            >
              حذف
            </button>
          </li>
        ))}
      </ul>

      {/* پاپ‌آپ افزودن کاربر جدید */}
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h4>افزودن کاربر جدید</h4>
            <form onSubmit={handleSubmit(onAddUser)} className={styles.form}>
              <label className={styles.label}>کد ملی:</label>
              <input
                type="text"
                {...register('nationalCode')}
                className={styles.input}
              />
              {errors.nationalCode && (
                <p className={styles.error}>{errors.nationalCode.message}</p>
              )}

              <label className={styles.label}>نام:</label>
              <input
                type="text"
                {...register('name')}
                className={styles.input}
              />
              {errors.name && <p className={styles.error}>{errors.name.message}</p>}

              <label className={styles.label}>نام خانوادگی:</label>
              <input
                type="text"
                {...register('family')}
                className={styles.input}
              />
              {errors.family && <p className={styles.error}>{errors.family.message}</p>}

              <button type="submit" className={styles.submitButton}>افزودن</button>
              <button type="button" onClick={closePopup} className={styles.cancelButton}>لغو</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
