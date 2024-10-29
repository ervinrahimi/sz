// src/components/dashboard/PurchaseHistory/PurchaseHistory.jsx
'use client'

import { useEffect, useState } from 'react'
import styles from './PurchaseHistory.module.css'
import { getUserOrders } from '@/actions/dashboard/getUserOrders'
import { useRouter } from 'next/navigation'

export default function PurchaseHistory() {
  const [orders, setOrders] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function fetchOrders() {
      const res = await getUserOrders()
      if (res.success) {
        setOrders(res.orders)
        router.refresh()
      }
    }
    fetchOrders()
  }, [])

  return (
    <div className={styles.purchaseHistory}>
      <h2 className={styles.title}>سوابق خرید و سفارشات</h2>
      {orders.length > 0 ? (
        <div className={styles.ordersList}>
          {orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderRow}>
                <span className={styles.orderLabel}>تاریخ خرید:</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className={styles.orderRow}>
                <span className={styles.orderLabel}>نام خودرو:</span>
                <span>{order.car.name}</span>
              </div>
              <div className={styles.orderRow}>
                <span className={styles.orderLabel}>شرایط فروش:</span>
                <span>{order.salesCondition.name}</span>
              </div>
              <div className={styles.orderRow}>
                <span className={styles.orderLabel}>وضعیت سفارش:</span>
                <span>{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>هیچ سفارشی یافت نشد.</p>
      )}
    </div>
  )
}
