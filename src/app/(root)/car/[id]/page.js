// صفحه جزئیات خودرو
import React from 'react';
import { getCarDetails } from '@/actions/getCarDetails';
import CarDetails from '@/components/CarDetails';
import { auth } from '@/security/auth';

export default async function CarDetailsPage({ params }) {
  const { id } = params;
  const session = await auth()

  // دریافت جزئیات خودرو از سرور
  const car = await getCarDetails(id);

  return (
    <div>
      <CarDetails car={car}  />
    </div>
  );
}
