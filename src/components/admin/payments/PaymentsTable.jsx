// src/components/admin/payments/PaymentsTable.jsx

'use client'

import Link from 'next/link'
import styles from './PaymentsTable.module.css'

export default function PaymentsTable({ payments }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>کد پرداخت</th>
          <th>خریدار</th>
          <th>مبلغ</th>
          <th>روش پرداخت</th>
          <th>وضعیت</th>
          <th>تاریخ پرداخت</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment) => (
          <tr key={payment.id}>
            <td>{payment.id}</td>
            <td>
              {payment.order.user.name} {payment.order.user.family}
            </td>
            <td>{payment.amount}</td>
            <td>{payment.method}</td>
            <td>{getPaymentStatus(payment.status)}</td>
            <td>{new Date(payment.date).toLocaleDateString('fa-IR')}</td>
            <td>
              <Link href={`/admin/payments/${payment.id}`}>بررسی</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
