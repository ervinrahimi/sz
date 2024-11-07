// src/app/admin/sales-conditions/[id]/page.jsx

import prisma from '@/db/client'
import styles from '../../page.module.css'
import SalesConditionEditForm from '@/components/admin/sales-conditions/SalesConditionEditForm'
import Link from 'next/link'

export default async function SalesConditionEditPage({ params }) {
  const conditionId = params.id
  const salesCondition = await prisma.salesCondition.findUnique({
    where: { id: conditionId },
    include: {
      authorizedUsers: true,
      car: true,
    },
  })

  console.log(salesCondition)

  if (!salesCondition) {
    return <div>شرایط فروش یافت نشد</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>ویرایش شرایط فروش</h1>
          {salesCondition.isLocked && (
            <div className={styles.buttons}>
              <Link
                href={`/admin/sales-conditions/${salesCondition.id}/manage-user`}
                className={styles.button}
              >
                افزودن خریداران خاص
              </Link>
            </div>
          )}
        </div>
        <div className={styles.balanceBox}>
          <SalesConditionEditForm salesCondition={salesCondition} />
        </div>
      </div>
    </div>
  )
}
