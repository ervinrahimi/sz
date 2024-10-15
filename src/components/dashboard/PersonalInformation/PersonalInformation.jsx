// src/components/dashboard/PersonalInformation/PersonalInformation.jsx
'use client'

import { useState } from 'react'
import styles from './PersonalInformation.module.css'
import { updatePersonalInfo } from '@/actions/dashboard/updatePersonalInfo'

export default function PersonalInformation({ user }) {
  const [name, setName] = useState(user.name || '')
  const [family, setFamily] = useState(user.family || '')
  const [email, setEmail] = useState(user.email || '')
  const [phone, setPhone] = useState(user.phone || '')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await updatePersonalInfo({
      name,
      family,
      email,
      phone,
    })
    if (res.success) {
      setMessage('اطلاعات با موفقیت به‌روزرسانی شد.')
    } else {
      setMessage(res.message || 'خطا در به‌روزرسانی اطلاعات.')
    }
  }

  return (
    <div className={styles.personalInformation}>
      <h2 className={styles.title}>اطلاعات شخصی</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          نام:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          نام خانوادگی:
          <input
            type="text"
            value={family}
            onChange={(e) => setFamily(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          ایمیل:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          شماره تلفن:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>ذخیره تغییرات</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  )
}
