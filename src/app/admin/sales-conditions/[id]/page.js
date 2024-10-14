// src/app/admin/sales-conditions/[id]/page.jsx

import prisma from '@/db/client'
import SalesConditionDetails from '@/components/admin/sales-conditions/SalesConditionDetails'

export default async function SalesConditionDetailsPage({ params }) {
  const conditionId = params.id
  const salesCondition = await prisma.salesCondition.findUnique({
    where: { id: conditionId },
    include: {
      car: true,
      authorizedUsers: true,
    },
  })

  if (!salesCondition) {
    return <div>شرایط فروش یافت نشد</div>
  }

  return (
    <div>
      <h1>جزئیات شرایط فروش</h1>
      <SalesConditionDetails salesCondition={salesCondition} />
    </div>
  )
}
