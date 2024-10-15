// src/app/admin/vehicles/page.jsx

import Link from 'next/link'
import styles from '../page.module.css'
import VehiclesTable from '@/components/admin/vehicles/VehiclesTable'

export default async function VehiclesPage() {
  const vehicles = await prisma.car.findMany()

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مدیریت خودروها</h1>
          <div className={styles.buttons}>
            <Link href={'/admin/vehicles/create'} className={styles.button}>
              افزودن خودرو جدید
            </Link>
          </div>
        </div>
        <div className={styles.balanceBox}>
          <VehiclesTable vehicles={vehicles} />
        </div>
      </div>
    </div>
  )
}
