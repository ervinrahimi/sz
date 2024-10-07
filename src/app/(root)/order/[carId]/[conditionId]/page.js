'use client'
import React, { useState } from 'react';
import { checkAuthorization } from '@/actions/checkAuthorization';
import { useRouter } from 'next/navigation';

export default function OrderPage({ params, searchParams }) {
  const { carId, conditionId } = params;
  const appearances = JSON.parse(searchParams.appearances || '{}');
  const [nationalCode, setNationalCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // تابع برای بررسی مجوز
  const handleCheckAuthorization = async () => {
    const isAuthorized = await checkAuthorization(conditionId, nationalCode);
    if (isAuthorized) {
      // هدایت به مرحله بعدی ثبت سفارش
      router.push(`/order/${carId}/${conditionId}/process?appearances=${JSON.stringify(appearances)}`);
    } else {
      setError('شما واجد شرایط انجام این عملیات نیستید.');
    }
  };

  return (
    <div>
      <h1>ثبت سفارش</h1>
      <p>لطفاً کد ملی خود را وارد کنید:</p>
      <input value={nationalCode} onChange={(e) => setNationalCode(e.target.value)} />
      <button onClick={handleCheckAuthorization}>بررسی مجوز</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
