// src/app/admin/vehicles/page.jsx

import Link from 'next/link'
import styles from '../../page.module.css'
import VehicleCreate from '@/components/admin/vehicles/VehicleCreate'

export default async function VehiclesPage() {
  const vehicles = await prisma.car.findMany()

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>ایجاد خودرو جدید</h1>
        </div>
        <div className={styles.balanceBox}>
          <VehicleCreate/>
        </div>
      </div>
    </div>
  )
}
