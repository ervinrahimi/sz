// src/app/admin/users/create/page.jsx

'use client'

import { createUser } from '@/actions/admin/user'
import { useState } from 'react'
import { useRouter } from 'next/navigation' // برای ریدایرکت
import styles from '../../page.module.css'

export default function CreateUserPage() {
  const [formData, setFormData] = useState({
    name: '',
    family: '',
    email: '',
    phone: '',
    password: '',
    nationalCode: '',
    role: '0', // نقش پیش‌فرض: کاربر عادی
  })
  const [message, setMessage] = useState('')
  const router = useRouter() // برای استفاده از ریدایرکت

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createUser(formData)
      setMessage('کاربر با موفقیت ایجاد شد.')
      // پس از ایجاد موفقیت‌آمیز، ریدایرکت به صفحه لیست کاربران
      router.push('/admin/users')
    } catch (error) {
      setMessage(error.message || 'خطایی رخ داده است.')
    }
  }

  return (
    <div className={styles.createUserPage}>
      <h1>ایجاد کاربر جدید</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          نام:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </label>
        <label>
          نام خانوادگی:
          <input
            type="text"
            value={formData.family}
            onChange={(e) => setFormData({ ...formData, family: e.target.value })}
            required
          />
        </label>
        <label>
          کد ملی:
          <input
            type="number"
            value={formData.nationalCode}
            onChange={(e) => setFormData({ ...formData, nationalCode: e.target.value })}
            required
          />
        </label>
        <label>
          ایمیل:
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </label>
        <label>
          شماره تماس:
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </label>
        <label>
          رمز عبور:
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </label>
        <label>
          نقش:
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="0">کاربر عادی</option>
            <option value="1">ادمین</option>
          </select>
        </label>
        <button className={styles.button} type="submit">
          ایجاد کاربر
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  )
}
