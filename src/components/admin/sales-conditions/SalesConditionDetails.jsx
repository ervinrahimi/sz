// src/components/admin/sales-conditions/SalesConditionDetails.jsx

'use client'

import { useState } from 'react'
import styles from './SalesConditionDetails.module.css'
import { updateSalesCondition } from '@/actions/admin/sales-conditions'

export default function SalesConditionDetails({ salesCondition }) {
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    id: salesCondition.id,
    name: salesCondition.name || '',
    conditionType: salesCondition.conditionType || 'GENERAL',
    isLocked: salesCondition.isLocked || false,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateSalesCondition(formData)
    setEditing(false)
  }

  return (
    <div className={styles.salesConditionDetails}>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <label>
            نام شرایط:
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </label>
          <label>
            نوع شرایط:
            <select
              value={formData.conditionType}
              onChange={(e) =>
                setFormData({ ...formData, conditionType: e.target.value })
              }
            >
              <option value="GENERAL">عمومی</option>
              <option value="SPECIAL">خاص</option>
              <option value="ORGANIZATIONAL">سازمانی</option>
            </select>
          </label>
          <label>
            وضعیت:
            <select
              value={formData.isLocked ? 'true' : 'false'}
              onChange={(e) =>
                setFormData({ ...formData, isLocked: e.target.value === 'true' })
              }
            >
              <option value="false">باز</option>
              <option value="true">قفل شده</option>
            </select>
          </label>
          <button type="submit">ذخیره</button>
          <button type="button" onClick={() => setEditing(false)}>
            لغو
          </button>
        </form>
      ) : (
        <div>
          <p>نام شرایط: {salesCondition.name}</p>
          <p>نوع شرایط: {getConditionType(salesCondition.conditionType)}</p>
          <p>وضعیت: {salesCondition.isLocked ? 'قفل شده' : 'باز'}</p>
          <button onClick={() => setEditing(true)}>ویرایش اطلاعات</button>
        </div>
      )}
      {/* مدیریت کاربران مجاز */}
      {salesCondition.isLocked && (
        <div>
          <h3>کاربران مجاز</h3>
          {/* نمایش لیست کاربران مجاز و امکان افزودن یا حذف */}
        </div>
      )}
    </div>
  )
}

function getConditionType(type) {
  switch (type) {
    case 'GENERAL':
      return 'عمومی'
    case 'SPECIAL':
      return 'خاص'
    case 'ORGANIZATIONAL':
      return 'سازمانی'
    default:
      return ''
  }
}
