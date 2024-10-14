// src/components/admin/users/UserDetails.jsx

'use client'

import { useState } from 'react'
import { updateUser } from '@/actions/admin/user'
import styles from './UserDetails.module.css'

export default function UserDetails({ user }) {
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name || '',
    family: user.family || '',
    email: user.email || '',
    phone: user.phone || '',
    role: user.role || 0,
  })
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateUser(formData)
      setMessage('اطلاعات کاربر با موفقیت به‌روزرسانی شد.')
      setEditing(false)
    } catch (error) {
      setMessage('خطایی رخ داده است.')
    }
  }

  return (
    <div className={styles.userDetails}>
      <h1>جزئیات کاربر</h1>
      {editing ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            نام:
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </label>
          <label>
            نام خانوادگی:
            <input
              type="text"
              value={formData.family}
              onChange={(e) =>
                setFormData({ ...formData, family: e.target.value })
              }
            />
          </label>
          <label>
            ایمیل:
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </label>
          <label>
            شماره تماس:
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </label>
          <label>
            نقش:
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: parseInt(e.target.value) })
              }
            >
              <option value={0}>کاربر عادی</option>
              <option value={1}>ادمین</option>
            </select>
          </label>
          <button className={styles.button} type="submit">ذخیره</button>
          <button className={styles.button} type="button" onClick={() => setEditing(false)}>
            لغو
          </button>
        </form>
      ) : (
        <div className={styles.details}>
          <p>نام: {user.name}</p>
          <p>نام خانوادگی: {user.family}</p>
          <p>ایمیل: {user.email}</p>
          <p>شماره تماس: {user.phone}</p>
          <p>نقش: {user.role === 1 ? 'ادمین' : 'کاربر'}</p>
          <button onClick={() => setEditing(true)} className={styles.editButton}>
            ویرایش اطلاعات
          </button>
        </div>
      )}
      {message && <p className={styles.message}>{message}</p>}
    </div>
  )
}
