// src/components/admin/vehicles/VehiclesTable.jsx

'use client'

import Link from 'next/link'
import styles from './VehiclesTable.module.css'

export default function VehiclesTable({ vehicles }) {
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.headerCell}>کد خودرو</div>
        <div className={styles.headerCell}>مدل</div>
        <div className={styles.headerCell}>نام</div>
        <div className={styles.headerCell}>وضعیت</div>
        <div className={styles.headerCell}>عملیات</div>
      </div>
      <div className={styles.body}>
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className={styles.row}>
            <div className={styles.cell}>{vehicle.id}</div>
            <div className={styles.cell}>{vehicle.model}</div>
            <div className={styles.cell}>{vehicle.name}</div>
            <div className={styles.cell}>
              {vehicle.status === 'AVAILABLE' ? 'موجود' : 'ناموجود'}
            </div>
            <div className={styles.cell}>
              <Link href={`/admin/vehicles/${vehicle.id}`}>
                <button className={styles.button}>ویرایش</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
