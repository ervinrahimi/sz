// صفحه فرآیند چند مرحله‌ای ثبت سفارش
import React from 'react';

export default function OrderProcessPage({ params, searchParams }) {
  const { carId, conditionId } = params;
  const appearances = JSON.parse(searchParams.appearances || '{}');

  return (
    <div>
      <h1>فرآیند ثبت سفارش</h1>
      {/* نمایش اطلاعات انتخابی کاربر */}
      <p>خودرو: {carId}</p>
      <p>شرایط فروش: {conditionId}</p>
      <p>مشخصات ظاهری انتخاب‌شده:</p>
      <ul>
        {Object.entries(appearances).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
      {/* سایر مراحل ثبت سفارش */}
      <button onClick={() => alert('سفارش شما ثبت شد!')}>ثبت نهایی</button>
    </div>
  );
}
