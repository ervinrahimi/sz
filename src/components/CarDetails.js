// کامپوننت جزئیات خودرو
import React, { useState } from 'react';
import AppearanceSelector from './AppearanceSelector';
import Specifications from './Specifications';
import SaleConditions from './SaleConditions';

export default function CarDetails({ car }) {
  // حالت‌های انتخابی کاربر
  const [selectedAppearances, setSelectedAppearances] = useState({});

  return (
    <div>
      <h1>{car.name}</h1>
      <img src={car.images[0]} alt={car.name} />
      <p>{car.description}</p>

      {/* مشخصات ظاهری */}
      <AppearanceSelector
        appearances={car.appearances}
        selectedAppearances={selectedAppearances}
        setSelectedAppearances={setSelectedAppearances}
      />

      {/* مشخصات فنی */}
      <Specifications specifications={car.specifications} />

      {/* شرایط فروش */}
      <SaleConditions saleConditions={car.saleConditions} carId={car.id} selectedAppearances={selectedAppearances} />
    </div>
  );
}
