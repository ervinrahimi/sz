// src/app/admin/orders/[id]/page.jsx

import prisma from '@/db/client'
import OrderDetails from '@/components/admin/orders/OrderDetails'

export default async function OrderDetailsPage({ params }) {
  const orderId = params.id
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: true,
      car: true,
      salesCondition: true,
      orderSteps: true,
      documents: true,
      payments: true,
    },
  })

  if (!order) {
    return <div>سفارش یافت نشد</div>
  }

  return (
    <div>
      <h1>جزئیات سفارش</h1>
      <OrderDetails order={order} />
    </div>
  )
}
