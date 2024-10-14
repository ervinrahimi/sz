// src/components/admin/vehicles/VehicleDetails.jsx

'use client'

import { useState } from 'react'
import styles from './VehicleDetails.module.css'
import { updateVehicle } from '@/actions/admin/vehicles'

export default function VehicleDetails({ vehicle }) {
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    id: vehicle.id,
    model: vehicle.model || '',
    name: vehicle.name || '',
    status: vehicle.status || 'AVAILABLE',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateVehicle(formData)
    setEditing(false)
  }

  return (
    <div className={styles.vehicleDetails}>
      {editing ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            مدل:
            <input
              type="text"
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            نام:
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            وضعیت:
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className={styles.select}
            >
              <option value="AVAILABLE">موجود</option>
              <option value="UNAVAILABLE">ناموجود</option>
            </select>
          </label>
          <div className={styles.actions}>
            <button type="submit" className={styles.saveButton}>ذخیره</button>
            <button type="button" className={styles.cancelButton} onClick={() => setEditing(false)}>
              لغو
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.details}>
          <p className={styles.text}>مدل: {vehicle.model}</p>
          <p className={styles.text}>نام: {vehicle.name}</p>
          <p className={styles.text}>وضعیت: {vehicle.status === 'AVAILABLE' ? 'موجود' : 'ناموجود'}</p>
          <button onClick={() => setEditing(true)} className={styles.editButton}>
            ویرایش اطلاعات
          </button>
        </div>
      )}
      {/* نمایش مشخصات ظاهری، فنی و شرایط فروش */}
    </div>
  )
}
