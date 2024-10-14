'use client'

import { useState } from 'react'
import { updateOrderStatus, addAdminNote } from '@/actions/admin/orders'
import styles from './OrderDetails.module.css'

export default function OrderDetails({ order }) {
  const [status, setStatus] = useState(order.status)
  const [note, setNote] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')

  // تابع تغییر وضعیت سفارش
  const handleStatusChange = async (newStatus) => {
    setIsPending(true)
    const result = await updateOrderStatus(order.id, newStatus)
    setStatus(newStatus)
    setIsPending(false)
    setMessage(result.message)
  }

  // تابع اضافه کردن یادداشت توسط کارشناس
  const handleAddNote = async () => {
    if (note.trim() === '') return
    setIsPending(true)
    const result = await addAdminNote(order.id, note)
    setNote('')
    setIsPending(false)
    setMessage(result.message)
  }

  return (
    <div className={styles.orderDetails}>
      <h2>اطلاعات سفارش</h2>
      <p>کد سفارش: {order.id}</p>
      <p>
        مشتری: {order.user.name} {order.user.family}
      </p>
      <p>ایمیل مشتری: {order.user.email}</p>
      <p>خودرو: {order.car.name}</p>
      <p>شرایط فروش: {order.salesCondition.name}</p>
      <p>روش پرداخت: {order.salesCondition.paymentType}</p>
      <p>وضعیت سفارش: {status}</p>

      <h3>مراحل سفارش</h3>
      <ul>
        {order.orderSteps.map((step, index) => (
          <li key={index}>
            {step.stepNumber}. {step.name} - وضعیت: {getStepStatus(step.status)}
            {step.adminNotes && <p>یادداشت کارشناس: {step.adminNotes}</p>}
          </li>
        ))}
      </ul>

      <h3>پرداخت‌ها</h3>
      <ul>
        {order.payments.map((payment, index) => (
          <li key={index}>
            مبلغ: {payment.amount} - وضعیت: {getPaymentStatus(payment.status)} - روش پرداخت:{' '}
            {payment.method}
          </li>
        ))}
      </ul>

      <h3>مدارک و مستندات</h3>
      <ul>
        {order.documents.map((doc, index) => (
          <li key={index}>
            نوع سند: {getDocumentType(doc.type)} -
            <a href={doc.file.url} target="_blank" rel="noopener noreferrer">
              مشاهده فایل
            </a>{' '}
            - وضعیت: {getDocumentStatus(doc.status)}
          </li>
        ))}
      </ul>

      <h3>افزودن یادداشت کارشناس</h3>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="یادداشت جدید"
        className={styles.textarea}
      ></textarea>
      <button onClick={handleAddNote} disabled={isPending} className={styles.addButton}>
        {isPending ? 'در حال ثبت...' : 'ثبت یادداشت'}
      </button>

      <h3>تغییر وضعیت سفارش</h3>
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        className={styles.select}
      >
        <option value="PENDING">در انتظار</option>
        <option value="PROCESSING">در حال پردازش</option>
        <option value="CONFIRMED">تایید شده</option>
        <option value="COMPLETED">تکمیل شده</option>
        <option value="CANCELED">لغو شده</option>
        <option value="SUSPENDED">معلق</option>
      </select>
      {message && <p>{message}</p>}
    </div>
  )
}

function getStepStatus(status) {
  switch (status) {
    case 'PENDING':
      return 'در انتظار'
    case 'COMPLETED':
      return 'تکمیل شده'
    case 'REJECTED':
      return 'رد شده'
    default:
      return ''
  }
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

function getDocumentStatus(status) {
  switch (status) {
    case 'PENDING':
      return 'در انتظار بررسی'
    case 'CONFIRMED':
      return 'تایید شده'
    case 'REJECTED':
      return 'رد شده'
    default:
      return ''
  }
}

function getDocumentType(type) {
  switch (type) {
    case 'NATIONAL_ID':
      return 'کارت ملی'
    case 'BIRTH_CERTIFICATE':
      return 'شناسنامه'
    case 'OTHER':
      return 'سایر'
    default:
      return ''
  }
}
