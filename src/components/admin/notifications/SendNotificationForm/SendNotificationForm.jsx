// src/components/admin/notifications/SendNotificationForm.jsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendNotificationSchema } from '@/security/zod/validationSchema'
import { sendNotification, searchUsersByName } from '@/actions/admin/notifications'
import styles from '@/styles/form.module.css'
import { useState } from 'react'

export default function SendNotificationForm() {
  const [searchResults, setSearchResults] = useState([]) // نتایج جستجو
  const [searchQuery, setSearchQuery] = useState('') // رشته جستجو
  const [selectedUserId, setSelectedUserId] = useState('') // کاربر انتخاب شده
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(sendNotificationSchema),
    defaultValues: {
      userId: '',
      userName: '',
      title: '',
      message: '',
    },
  })

  // هندل کردن جستجوی نام کاربر
  const handleSearch = async (e) => {
    setSearchQuery(e.target.value)
    if (e.target.value.length >= 2) {
      const results = await searchUsersByName(e.target.value)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  // انتخاب کاربر از لیست کشویی
  const handleSelectUser = (e) => {
    const userId = e.target.value
    const selectedUser = searchResults.find((user) => user.id === userId)
    if (selectedUser) {
      setSelectedUserId(userId)
      setValue('userId', selectedUser.id)
      setValue('userName', `${selectedUser.name} ${selectedUser.family}`)
      setSearchResults([]) // پاک کردن نتایج بعد از انتخاب کاربر
      setSearchQuery('') // خالی کردن فیلد جستجو پس از انتخاب
    }
  }

  const onSubmit = async (formData) => {
    setSuccessMessage(null)
    setErrorMessage(null)

    try {
      await sendNotification(formData)
      setSuccessMessage('نوتیفیکیشن با موفقیت ارسال شد.')
      reset()
    } catch (error) {
      setErrorMessage('خطا در ارسال نوتیفیکیشن. لطفاً مجدداً تلاش کنید.')
    }
  }

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>ارسال پیام جدید</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <label className={styles.formLabel}>
          جستجوی کاربر:
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="نام یا فامیل کاربر را وارد کنید"
            className={styles.formInput}
          />
        </label>

        {searchResults.length > 0 && (
          <label className={styles.formLabel}>
            انتخاب کاربر:
            <select value={selectedUserId} onChange={handleSelectUser} className={styles.formInput}>
              <option value="">انتخاب کاربر</option>
              {searchResults.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} {user.family} - {user.email}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className={styles.formLabel}>
          کاربر انتخاب شده:
          <input
            type="text"
            {...register('userName')}
            readOnly
            placeholder="نام کاربر انتخاب‌شده در اینجا نمایش داده می‌شود"
            className={styles.formInput}
          />
          {errors.userId && <p className={styles.formError}>{errors.userId.message}</p>}
        </label>

        <label className={styles.formLabel}>
          عنوان پیام:
          <input type="text" {...register('title')} className={styles.formInput} />
          {errors.title && <p className={styles.formError}>{errors.title.message}</p>}
        </label>

        <label className={styles.formLabel}>
          متن پیام:
          <textarea {...register('message')} className={styles.formInput} />
          {errors.message && <p className={styles.formError}>{errors.message.message}</p>}
        </label>

        <button type="submit" className={styles.formButton} disabled={isSubmitting}>
          {isSubmitting ? 'در حال ارسال...' : 'ارسال نوتیفیکیشن'}
        </button>
      </form>
      {successMessage && <p className={styles.formMessage}>{successMessage}</p>}
      {errorMessage && <p className={styles.formError}>{errorMessage}</p>}
    </div>
  )
}
