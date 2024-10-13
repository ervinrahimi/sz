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
      <h2>اطلاعات شخصی</h2>
      <form onSubmit={handleSubmit}>
        <label>
          نام:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          نام خانوادگی:
          <input type="text" value={family} onChange={(e) => setFamily(e.target.value)} />
        </label>
        <label>
          ایمیل:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          شماره تلفن:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <button type="submit">ذخیره تغییرات</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}
