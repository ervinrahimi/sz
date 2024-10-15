// src/app/admin/payments/[id]/page.jsx

import prisma from '@/db/client'
import PaymentDetails from '@/components/admin/payments/PaymentDetails'

export default async function PaymentDetailsPage({ params }) {
  const paymentId = params.id
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      order: {
        include: {
          user: true,
        },
      },
      receipts: true,
    },
  })

  if (!payment) {
    return <div>پرداخت یافت نشد</div>
  }

  return (
    <div>
      <h1>جزئیات پرداخت</h1>
      <PaymentDetails payment={payment} />
    </div>
  )
}