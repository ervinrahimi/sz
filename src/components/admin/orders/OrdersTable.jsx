// src/components/admin/orders/OrdersTable.jsx

'use client'

import Link from 'next/link'
import styles from './OrdersTable.module.css'
import toast from 'react-hot-toast'

export default function OrdersTable({ orders }) {
  const handleToast = () => {
    toast('در حال حاضر نمیتوانید این عملیات را انجام دهید')
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>کد سفارش</th>
          <th>نام خریدار</th>
          <th>خودرو</th>
          <th>روش فروش</th>
          <th>وضعیت سفارش</th>
          <th>تاریخ ثبت</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>
              {order.user.name} {order.user.family}
            </td>
            <td>{order.car.name}</td>
            <td>{order.salesCondition.salesMethod}</td>
            <td>{order.status}</td>
            <td>{new Date(order.createdAt).toLocaleDateString('fa-IR')}</td>
            <td>
              {/* <Link href={`/admin/orders/${order.id}`}>مشاهده</Link> */}
              <Link onClick={handleToast} href={`#`}>مشاهده</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
