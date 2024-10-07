// کامپوننت برای نمایش لیست خودروها
import React from 'react';
import CarCard from './CarCard';

export default function CarList({ cars }) {
  return (
    <div>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
