// src/app/admin/sales-conditions/new/page.jsx

import NewSalesConditionForm from '@/components/admin/sales-conditions/NewSalesConditionForm'
import prisma from '@/db/client'

export default async function NewSalesConditionPage() {
  // دریافت لیست خودروها از دیتابیس
  const cars = await prisma.car.findMany({
    select: {
      id: true,
      name: true,
    },
  })

  return (
    <div>
      <h1>ایجاد شرایط فروش جدید</h1>
      <NewSalesConditionForm cars={cars} />
    </div>
  )
}
