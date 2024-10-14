// src/components/admin/orders/OrderDetails.jsx

'use client'

import { useState } from 'react'
import styles from './OrderDetails.module.css'

export default function OrderDetails({ order }) {
  // مدیریت مراحل سفارش، پرداخت‌ها و مدارک
  return (
    <div className={styles.orderDetails}>
      <h2>اطلاعات سفارش</h2>
      <p>کد سفارش: {order.id}</p>
      <p>
        خریدار: {order.user.name} {order.user.family}
      </p>
      <p>خودرو: {order.car.name}</p>
      <p>روش فروش: {order.salesCondition.salesMethod}</p>
      <p>وضعیت سفارش: {order.status}</p>
      {/* نمایش جزئیات مراحل، پرداخت‌ها و مدارک */}
    </div>
  )
}
