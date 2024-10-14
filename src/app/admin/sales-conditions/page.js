// src/app/admin/sales-conditions/page.jsx

import Link from 'next/link'
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
      <div style={{ marginBottom: '20px' }}>
        <Link href="/admin/sales-conditions/new">
          <button>ایجاد شرایط فروش جدید</button>
        </Link>
      </div>
      <SalesConditionsTable salesConditions={salesConditions} />
    </div>
  )
}
