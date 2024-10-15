// src/components/dashboard/ChangePassword/ChangePassword.jsx
'use client'

import { useState } from 'react'
import styles from './ChangePassword.module.css'
import { changePassword } from '@/actions/dashboard/changePassword'

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmNewPassword) {
      setMessage('رمز عبور جدید و تکرار آن مطابقت ندارند.')
      return
    }

    const res = await changePassword({
      currentPassword,
      newPassword,
    })

    if (res.success) {
      setMessage('رمز عبور با موفقیت تغییر کرد.')
    } else {
      setMessage(res.message || 'خطا در تغییر رمز عبور.')
    }
  }

  return (
    <div className={styles.changePassword}>
      <h2 className={styles.title}>تغییر رمز عبور</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          رمز عبور فعلی:
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          رمز عبور جدید:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          تکرار رمز عبور جدید:
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>تغییر رمز عبور</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  )
}
