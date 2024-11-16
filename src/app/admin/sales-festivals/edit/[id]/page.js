// src/app/admin/sales-festivals/edit/[id]/page.jsx

import { getSalesConditions, getSalesFestivalById } from '@/actions/admin/salesFestivals'
import SalesFestivalForm from '@/components/admin/salesFestivals/SalesFestivalForm'
import styles from '../../../page.module.css'

export default async function EditSalesFestivalPage({ params }) {
  const { id } = params
  const festival = await getSalesFestivalById(id)
  const salesConditions = await getSalesConditions()

  if (!festival) {
    return <div>جشنواره یافت نشد</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>ویرایش جشنواره</h1>
        </div>
        <div className={styles.balanceBox}>
          <SalesFestivalForm festival={festival} salesConditions={salesConditions} />
        </div>
      </div>
    </div>
  )
}
