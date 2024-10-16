// src/app/admin/sales-conditions/[id]/page.jsx

import prisma from '@/db/client'
import styles from '../../page.module.css'
import SalesConditionEditForm from '@/components/admin/sales-conditions/SalesConditionEditForm'

export default async function SalesConditionEditPage({ params }) {
  const conditionId = params.id
  const salesCondition = await prisma.salesCondition.findUnique({
    where: { id: conditionId },
    include: {
      authorizedUsers: true,
      car: true,
    },
  })

  if (!salesCondition) {
    return <div>شرایط فروش یافت نشد</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>ویرایش شرایط فروش</h1>
        </div>
        <div className={styles.balanceBox}>
          <SalesConditionEditForm salesCondition={salesCondition} />
        </div>
      </div>
    </div>
  )
}
