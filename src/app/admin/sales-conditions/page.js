// src/app/admin/sales-conditions/page.jsx

import Link from 'next/link'
import prisma from '@/db/client'
import SalesConditionsTable from '@/components/admin/sales-conditions/SalesConditionsTable'
import styles from '../page.module.css'

export default async function SalesConditionsPage() {
  const salesConditions = await prisma.salesCondition.findMany({
    include: {
      car: true,
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مدیریت شرایط فروش</h1>
          <div className={styles.buttons}>
            <Link href={'/admin/sales-conditions/new'} className={styles.button}>
              ایجاد شرایط فروش
            </Link>
          </div>
        </div>
        <div className={styles.balanceBox}>
          <SalesConditionsTable salesConditions={salesConditions} />
        </div>
      </div>
    </div>
  )
}
