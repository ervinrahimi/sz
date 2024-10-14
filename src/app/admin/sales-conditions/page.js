// src/app/admin/sales-conditions/page.jsx

import prisma from '@/db/client'
import SalesConditionsTable from '@/components/admin/sales-conditions/SalesConditionsTable'

export default async function SalesConditionsPage() {
  const salesConditions = await prisma.salesCondition.findMany({
    include: {
      car: true,
    },
  })

  return (
    <div>
      <h1>مدیریت شرایط فروش</h1>
      <SalesConditionsTable salesConditions={salesConditions} />
    </div>
  )
}
