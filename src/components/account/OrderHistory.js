'use client'
import React, { useState, useEffect } from 'react'
import { getUserOrders } from '@/actions/orderActions'

export default function OrderHistory({ user }) {
  const [orders, setOrders] = useState([])

  // دریافت لیست سفارشات کاربر
  useEffect(() => {
    async function fetchData() {
      const data = await getUserOrders(user.id)
      setOrders(data)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2>سوابق خرید و سفارشات</h2>
      {orders.length === 0 ? (
        <p>شما هنوز هیچ سفارشی ثبت نکرده‌اید.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>نام خودرو</th>
              <th>تاریخ خرید</th>
              <th>شرایط فروش</th>
              <th>وضعیت سفارش</th>
              <th>جزئیات</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.car.name}</td>
                <td>{new Date(order.createdAt).toLocaleDateString('fa-IR')}</td>
                <td>{order.saleCondition.method}</td>
                <td>{order.status}</td>
                <td>
                  <button
                    onClick={() => {
                      /* نمایش جزئیات سفارش */
                    }}
                  >
                    مشاهده
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
