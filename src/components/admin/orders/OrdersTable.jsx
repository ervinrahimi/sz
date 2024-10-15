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
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.headerCell}>کد سفارش</div>
        <div className={styles.headerCell}>نام خریدار</div>
        <div className={styles.headerCell}>خودرو</div>
        <div className={styles.headerCell}>روش فروش</div>
        <div className={styles.headerCell}>وضعیت سفارش</div>
        <div className={styles.headerCell}>تاریخ ثبت</div>
        <div className={styles.headerCell}>عملیات</div>
      </div>
      <div className={styles.body}>
        {orders.map((order) => (
          <div key={order.id} className={styles.row}>
            <div className={styles.cell}>{order.id}</div>
            <div className={styles.cell}>
              {order.user.name} {order.user.family}
            </div>
            <div className={styles.cell}>{order.car.name}</div>
            <div className={styles.cell}>{order.salesCondition.salesMethod}</div>
            <div className={styles.cell}>{order.status}</div>
            <div className={styles.cell}>
              {new Date(order.createdAt).toLocaleDateString('fa-IR')}
            </div>
            <div className={styles.cell}>
              <Link href={`/admin/orders/${order.id}`}>
                <button className={styles.button}>مشاهده</button>
              </Link>
              {/* <button onClick={handleToast} className={styles.button}>مشاهده</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
