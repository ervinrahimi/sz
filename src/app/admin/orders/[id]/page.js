// src/app/admin/orders/[id]/page.jsx

import prisma from '@/db/client'
import OrderDetails from '@/components/admin/orders/OrderDetails'
import styles from '../../page.module.css'

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
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>جزئیات سفارش</h1>
        </div>
        <div className={styles.balanceBox}>
          <OrderDetails order={order} />
        </div>
      </div>
    </div>
  )
}
