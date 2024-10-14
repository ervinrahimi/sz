// src/components/admin/payments/PaymentDetails.jsx

'use client'

import { useState } from 'react'
import styles from './PaymentDetails.module.css'
import { updatePaymentStatus } from '@/actions/admin/payments'

export default function PaymentDetails({ payment }) {
  const [status, setStatus] = useState(payment.status)

  const handleStatusChange = async (newStatus) => {
    await updatePaymentStatus(payment.id, newStatus)
    setStatus(newStatus)
  }

  return (
    <div className={styles.paymentDetails}>
      <p>کد پرداخت: {payment.id}</p>
      <p>
        خریدار: {payment.order.user.name} {payment.order.user.family}
      </p>
      <p>مبلغ: {payment.amount}</p>
      <p>روش پرداخت: {payment.method}</p>
      <p>وضعیت: {getPaymentStatus(status)}</p>
      <p>تاریخ پرداخت: {new Date(payment.date).toLocaleDateString('fa-IR')}</p>
      {/* نمایش رسیدهای پرداخت */}
      <h3>رسیدهای پرداخت</h3>
      <ul>
        {payment.receipts.map((receipt) => (
          <li key={receipt.id}>
            <a href={receipt.url} target="_blank" rel="noopener noreferrer">
              {receipt.filename}
            </a>
          </li>
        ))}
      </ul>
      {/* دکمه‌های تغییر وضعیت */}
      <button onClick={() => handleStatusChange('CONFIRMED')}>تایید</button>
      <button onClick={() => handleStatusChange('REJECTED')}>رد</button>
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
