// src/app/admin/payments/page.jsx

import prisma from '@/db/client'
import PaymentsTable from '@/components/admin/payments/PaymentsTable'

export default async function PaymentsPage() {
  const payments = await prisma.payment.findMany({
    include: {
      order: {
        include: {
          user: true,
        },
      },
    },
  })

  return (
    <div>
      <h1>مدیریت پرداخت‌ها</h1>
      <PaymentsTable payments={payments} />
    </div>
  )
}
