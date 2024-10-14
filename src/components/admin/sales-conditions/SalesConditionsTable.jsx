// src/components/admin/sales-conditions/SalesConditionsTable.jsx

'use client'

import Link from 'next/link'
import styles from './SalesConditionsTable.module.css'

export default function SalesConditionsTable({ salesConditions }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>کد شرایط</th>
          <th>نام شرایط</th>
          <th>خودرو</th>
          <th>نوع شرایط</th>
          <th>وضعیت</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {salesConditions.map((condition) => (
          <tr key={condition.id}>
            <td>{condition.id}</td>
            <td>{condition.name}</td>
            <td>{condition.car.name}</td>
            <td>{getConditionType(condition.conditionType)}</td>
            <td>{condition.isLocked ? 'قفل شده' : 'باز'}</td>
            <td>
              <Link href={`/admin/sales-conditions/${condition.id}`}>ویرایش</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
