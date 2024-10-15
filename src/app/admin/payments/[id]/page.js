// src/app/admin/payments/[id]/page.jsx

import prisma from '@/db/client'
import PaymentDetails from '@/components/admin/payments/PaymentDetails'
import styles from '../../page.module.css'

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
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>جزئیات پرداخت</h1>
        </div>
        <div className={styles.balanceBox}>
          <PaymentDetails payment={payment} />
        </div>
      </div>
    </div>
  )
}
