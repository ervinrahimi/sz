// صفحه فرآیند چند مرحله‌ای ثبت سفارش
import React from 'react'
import Stepper from '@/components/Stepper'
import { getOrder } from '@/actions/getOrder'
import { auth } from '@/security/auth'

export default async function OrderProcessPage({ params }) {
  const { carId, conditionId } = params
  const session = await auth()

  // دریافت سفارش یا ایجاد سفارش جدید
  const order = await getOrder(carId, conditionId, (userId = session.user))

  return (
    <div>
      <h1>فرآیند ثبت سفارش</h1>
      <Stepper order={order} />
    </div>
  )
}
