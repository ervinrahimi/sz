// src/app/admin/sales-festivals/create/page.jsx

import { getSalesConditions } from '@/actions/admin/salesFestivals'
import SalesFestivalForm from '@/components/admin/salesFestivals/SalesFestivalForm'
import styles from '../../page.module.css'

export default async function CreateSalesFestivalPage() {
  const salesConditions = await getSalesConditions()

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>ایجاد جشنواره جدید</h1>
        </div>
        <div className={styles.balanceBox}>
          <SalesFestivalForm salesConditions={salesConditions} />
        </div>
      </div>
    </div>
  )
}
