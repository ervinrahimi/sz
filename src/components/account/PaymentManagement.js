'use client'
import React, { useState, useEffect } from 'react'
import { getUserPayments, uploadPaymentReceipt } from '@/actions/paymentActions'

export default function PaymentManagement({ user }) {
  const [payments, setPayments] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [receiptFile, setReceiptFile] = useState(null)

  // دریافت لیست پرداخت‌ها
  useEffect(() => {
    async function fetchData() {
      const data = await getUserPayments(user.id)
      setPayments(data)
    }
    fetchData()
  }, [])

  // تابع برای آپلود رسید پرداخت
  const handleUploadReceipt = async () => {
    if (!receiptFile || !selectedOrder) {
      alert('لطفاً سفارش و فایل رسید را انتخاب کنید.')
      return
    }
    const success = await uploadPaymentReceipt(selectedOrder.id, user.id, receiptFile)
    if (success) {
      alert('رسید پرداخت با موفقیت ارسال شد.')
      // به‌روزرسانی لیست پرداخت‌ها
    } else {
      alert('خطا در ارسال رسید پرداخت.')
    }
  }

  return (
    <div>
      <h2>مدیریت پرداخت‌ها</h2>
      <h3>پرداخت‌های انجام شده</h3>
      {payments.length === 0 ? (
        <p>هیچ پرداختی انجام نشده است.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>تاریخ پرداخت</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{new Date(payment.date).toLocaleDateString('fa-IR')}</td>
                <td>{payment.amount} تومان</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>آپلود رسید پرداخت</h3>
      <div>
        <label>انتخاب سفارش:</label>
        <select onChange={(e) => setSelectedOrder(e.target.value)}>
          {/* لیست سفارشات کاربر */}
          <option value="">انتخاب کنید</option>
          {payments.map((payment) => (
            <option key={payment.order.id} value={payment.order.id}>
              {payment.order.car.name}
            </option>
          ))}
        </select>
        <label>فایل رسید:</label>
        <input type="file" onChange={(e) => setReceiptFile(e.target.files[0])} />
        <button onClick={handleUploadReceipt}>ارسال رسید</button>
      </div>
    </div>
  )
}
