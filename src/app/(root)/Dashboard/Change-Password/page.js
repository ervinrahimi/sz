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
      <h2>تغییر رمز عبور</h2>
      <form onSubmit={handleSubmit}>
        <label>
          رمز عبور فعلی:
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </label>
        <label>
          رمز عبور جدید:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <label>
          تکرار رمز عبور جدید:
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </label>
        <button type="submit">تغییر رمز عبور</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}
