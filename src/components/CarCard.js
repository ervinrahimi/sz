// کامپوننت کارت خودرو
import React from 'react';
import Link from 'next/link';

export default function CarCard({ car }) {
  return (
    <div>
      <h2>{car.name}</h2>
      <p>{car.description}</p>
      <p>قیمت: {car.price} تومان</p>
      <Link href={`/car/${car.id}`}>مشاهده جزئیات</Link>
    </div>
  );
}
