'use client'

import { useState } from 'react'
import { sendNotification, searchUsersByName } from '@/actions/admin/notifications'
import styles from './SendNotificationForm.module.css'

export default function SendNotificationForm() {
  const [formData, setFormData] = useState({
    userId: '',
    userName: '', // اضافه کردن فیلد برای نمایش نام انتخاب‌شده
    title: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [searchResults, setSearchResults] = useState([]) // نتایج جستجو
  const [searchQuery, setSearchQuery] = useState('') // رشته جستجو

  // هندل کردن جستجوی نام کاربر
  const handleSearch = async (e) => {
    setSearchQuery(e.target.value)
    if (e.target.value.length >= 2) {
      // حداقل دو حرف برای جستجو
      const results = await searchUsersByName(e.target.value)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  // انتخاب کاربر از لیست جستجو و قرار دادن نام در فیلد ورودی
  const handleSelectUser = (user) => {
    setFormData({ ...formData, userId: user.id, userName: `${user.name} ${user.family}` })
    setSearchResults([]) // بستن لیست پس از انتخاب
    setSearchQuery('') // خالی کردن فیلد جستجو پس از انتخاب
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.userId) {
      setErrorMessage('لطفاً یک کاربر را انتخاب کنید.')
      return
    }

    setIsSubmitting(true)
    setSuccessMessage(null)
    setErrorMessage(null)

    try {
      await sendNotification(formData)
      setSuccessMessage('نوتیفیکیشن با موفقیت ارسال شد.')
      setFormData({ userId: '', userName: '', title: '', message: '' })
    } catch (error) {
      setErrorMessage('خطا در ارسال نوتیفیکیشن. لطفاً مجدداً تلاش کنید.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.notificationForm}>
      <h2>ارسال نوتیفیکیشن جدید</h2>
      <form onSubmit={handleSubmit}>
        <label>
          جستجوی کاربر:
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="نام یا فامیل کاربر را وارد کنید"
          />
        </label>
        {searchResults.length > 0 && (
          <ul className={styles.searchResults}>
            {searchResults.map((user) => (
              <li key={user.id} onClick={() => handleSelectUser(user)}>
                {user.name} {user.family} - {user.email}
              </li>
            ))}
          </ul>
        )}
        <label>
          کاربر انتخاب شده:
          <input
            type="text"
            value={formData.userName}
            readOnly
            placeholder="نام کاربر انتخاب‌شده در اینجا نمایش داده می‌شود"
          />
        </label>
        <label>
          عنوان پیام:
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </label>
        <label>
          متن پیام:
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'در حال ارسال...' : 'ارسال نوتیفیکیشن'}
        </button>
      </form>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  )
}
