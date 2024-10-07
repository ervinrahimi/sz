// صفحه جزئیات خودرو
import React from 'react';
import { getCarDetails } from '@/actions/getCarDetails';
import CarDetails from '@/components/CarDetails';

export default async function CarDetailsPage({ params }) {
  const { id } = params;
  // دریافت جزئیات خودرو از سرور
  const car = await getCarDetails(id);

  return (
    <div>
      <CarDetails car={car} />
    </div>
  );
}
