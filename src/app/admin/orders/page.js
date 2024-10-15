// src/app/admin/orders/page.jsx

import prisma from '@/db/client'
import OrdersTable from '@/components/admin/orders/OrdersTable'
import styles from '../page.module.css'

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      car: true,
      salesCondition: true,
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مدیریت سفارش‌ها</h1>
        </div>
        <div className={styles.balanceBox}>
          <OrdersTable orders={orders} />
        </div>
      </div>
    </div>
  )
}
