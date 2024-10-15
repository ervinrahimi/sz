// src/app/admin/payments/page.jsx

import prisma from '@/db/client'
import PaymentsTable from '@/components/admin/payments/PaymentsTable'
import styles from '../page.module.css'

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
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>مدیریت پرداخت‌ها</h1>
        </div>
        <div className={styles.balanceBox}>
          <PaymentsTable payments={payments} />
        </div>
      </div>
    </div>
  )
}
