// src/components/admin/payments/PaymentsTable.jsx

'use client'

import Link from 'next/link'
import styles from './PaymentsTable.module.css'

export default function PaymentsTable({ payments }) {
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.headerCell}>کد پرداخت</div>
        <div className={styles.headerCell}>خریدار</div>
        <div className={styles.headerCell}>مبلغ</div>
        <div className={styles.headerCell}>روش پرداخت</div>
        <div className={styles.headerCell}>وضعیت</div>
        <div className={styles.headerCell}>تاریخ پرداخت</div>
        <div className={styles.headerCell}>عملیات</div>
      </div>
      <div className={styles.body}>
        {payments.map((payment) => (
          <div key={payment.id} className={styles.row}>
            <div className={styles.cell}>{payment.id}</div>
            <div className={styles.cell}>
              {payment.order.user.name} {payment.order.user.family}
            </div>
            <div className={styles.cell}>{payment.amount}</div>
            <div className={styles.cell}>{payment.method}</div>
            <div className={styles.cell}>{getPaymentStatus(payment.status)}</div>
            <div className={styles.cell}>{new Date(payment.date).toLocaleDateString('fa-IR')}</div>
            <div className={styles.cell}>
              <Link href={`/admin/payments/${payment.id}`}>
                <button className={styles.button}>بررسی</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getPaymentStatus(status) {
  switch (status) {
    case 'PENDING':
      return 'در انتظار'
    case 'CONFIRMED':
      return 'تایید شده'
    case 'REJECTED':
      return 'رد شده'
    default:
      return ''
  }
}
