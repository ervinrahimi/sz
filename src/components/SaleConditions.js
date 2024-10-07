'use client'
import React from 'react';
import Link from 'next/link';

export default function SaleConditions({ saleConditions, carId, selectedAppearances }) {
  return (
    <div>
      <h2>شرایط فروش</h2>
      {saleConditions.map((condition) => (
        <div key={condition.id}>
          <h3>{condition.conditionType}</h3>
          <p>روش فروش: {condition.method}</p>
          <p>قیمت: {condition.price} تومان</p>
          {/* سایر اطلاعات شرایط فروش */}
          <Link
            href={{
              pathname: `/order/${carId}/${condition.id}`,
              query: { appearances: JSON.stringify(selectedAppearances) },
            }}
          >
            <button>ثبت سفارش</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
