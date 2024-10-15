// src/app/admin/sales-conditions/[id]/page.jsx

import prisma  from '@/db/client'
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
    <div>
      <h1>ویرایش شرایط فروش</h1>
      <SalesConditionEditForm salesCondition={salesCondition} />
    </div>
  )
}
