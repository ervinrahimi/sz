// src/app/admin/vehicles/page.jsx

import Link from 'next/link'
import styles from '../page.module.css'
import VehiclesTable from '@/components/admin/vehicles/VehiclesTable'

export default async function VehiclesPage() {
  const vehicles = await prisma.car.findMany()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.header}>مدیریت خودروها</h1>
        <Link href="/admin/vehicles/new">
          <button className={styles.addButton}>افزودن خودرو جدید</button>
        </Link>
      </div>
      <VehiclesTable vehicles={vehicles} />
    </div>
  )
}
