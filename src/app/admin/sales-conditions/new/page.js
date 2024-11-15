// src/app/admin/sales-conditions/new/page.jsx

import NewSalesConditionForm from '@/components/admin/sales-conditions/NewSalesConditionForm'
import prisma from '@/db/client'
import styles from '../../page.module.css'

export default async function NewSalesConditionPage() {
  // دریافت لیست خودروها از دیتابیس
  const cars = await prisma.car.findMany({
    select: {
      id: true,
      name: true,
    },
  })

  const salesFestivals = await prisma.salesFestival.findMany()

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>ایجاد شرایط فروش جدید</h1>
        </div>
        <div className={styles.balanceBox}>
          <NewSalesConditionForm cars={cars} salesFestivals={salesFestivals}/>
        </div>
      </div>
    </div>
  )
}
