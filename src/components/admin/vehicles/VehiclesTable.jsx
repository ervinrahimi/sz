// src/components/admin/vehicles/VehiclesTable.jsx

'use client'

import Link from 'next/link'
import styles from './VehiclesTable.module.css'

export default function VehiclesTable({ vehicles }) {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.headerRow}>
          <th className={styles.headerCell}>کد خودرو</th>
          <th className={styles.headerCell}>مدل</th>
          <th className={styles.headerCell}>نام</th>
          <th className={styles.headerCell}>وضعیت</th>
          <th className={styles.headerCell}>عملیات</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {vehicles.map((vehicle) => (
          <tr key={vehicle.id} className={styles.row}>
            <td className={styles.cell}>{vehicle.id}</td>
            <td className={styles.cell}>{vehicle.model}</td>
            <td className={styles.cell}>{vehicle.name}</td>
            <td className={styles.cell}>
              {vehicle.status === 'AVAILABLE' ? 'موجود' : 'ناموجود'}
            </td>
            <td className={styles.cell}>
              <Link href={`/admin/vehicles/${vehicle.id}`} className={styles.link}>
                ویرایش
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
