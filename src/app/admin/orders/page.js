// src/app/admin/orders/page.jsx

import prisma from '@/db/client'
import OrdersTable from '@/components/admin/orders/OrdersTable'

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      car: true,
      salesCondition: true,
    },
  })

  return (
    <div>
      <h1>مدیریت سفارش‌ها</h1>
      <OrdersTable orders={orders} />
    </div>
  )
}
