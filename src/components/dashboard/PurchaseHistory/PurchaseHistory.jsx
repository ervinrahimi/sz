'use client'

import { useEffect, useState } from 'react'
import styles from './PurchaseHistory.module.css'
import { getUserOrders } from '@/actions/dashboard/getUserOrders'

export default function PurchaseHistory() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchOrders() {
      const res = await getUserOrders()
      if (res.success) {
        setOrders(res.orders)
      }
    }
    fetchOrders()
  }, [])

  return (
    <div className={styles.purchaseHistory}>
      <h2>سوابق خرید و سفارشات</h2>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>تاریخ خرید</th>
              <th>نام خودرو</th>
              <th>شرایط فروش</th>
              <th>وضعیت سفارش</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.car.name}</td>
                <td>{order.salesCondition.name}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>هیچ سفارشی یافت نشد.</p>
      )}
    </div>
  )
}
