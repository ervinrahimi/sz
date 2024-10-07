// صفحه اصلی که لیست خودروها را نمایش می‌دهد
import React from 'react'
import CarList from '@/components/CarList'
import { getCars } from '@/actions/getCars'

export default async function HomePage() {
  // دریافت لیست خودروها از سرور
  const cars = await getCars()

  return (
    <div>
      <h1>لیست خودروها</h1>
      <CarList cars={cars} />
    </div>
  )
}
