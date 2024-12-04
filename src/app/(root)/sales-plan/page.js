import SalesPlans from '@/components/ui/SalesPlans/SalesPlans'
import styles from './page.module.css'
import React from 'react'

export default function SalesPlanPage() {
  return (
    <div className={styles.salesPlanContainer}>
      <SalesPlans />
    </div>
  )
}
