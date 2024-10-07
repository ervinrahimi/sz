// صفحه فرآیند چند مرحله‌ای ثبت سفارش
import React from 'react';
import Stepper from '@/components/Stepper';
import { getOrder } from '@/actions/getOrder';

export default async function OrderProcessPage({ params }) {
  const { carId, conditionId } = params;
  // دریافت سفارش یا ایجاد سفارش جدید
  const order = await getOrder(carId, conditionId);

  return (
    <div>
      <h1>فرآیند ثبت سفارش</h1>
      <Stepper order={order} />
    </div>
  );
}
