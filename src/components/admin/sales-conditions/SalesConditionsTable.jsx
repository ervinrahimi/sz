// src/components/admin/sales-conditions/SalesConditionsTable.jsx

'use client'

import styles from './SalesConditionsTable.module.css'
import Link from 'next/link'

export default function SalesConditionsTable({ salesConditions }) {
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.headerCell}>کد شرایط</div>
        <div className={styles.headerCell}>نام شرایط</div>
        <div className={styles.headerCell}>خودرو</div>
        <div className={styles.headerCell}>نوع شرایط</div>
        <div className={styles.headerCell}>وضعیت</div>
        <div className={styles.headerCell}>عملیات</div>
      </div>
      <div className={styles.body}>
        {salesConditions.map((condition) => (
          <div key={condition.id} className={styles.row}>
            <div className={styles.cell}>{condition.id}</div>
            <div className={styles.cell}>{condition.name}</div>
            <div className={styles.cell}>{condition.car.name}</div>
            <div className={styles.cell}>{getConditionType(condition.conditionType)}</div>
            <div className={styles.cell}>
              {condition.isLocked ? 'قفل شده' : 'باز'}
            </div>
            <div className={styles.cell}>
              <Link href={`/admin/sales-conditions/${condition.id}`}>
                <button className={styles.button}>ویرایش</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
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
