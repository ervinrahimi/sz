// src/app/admin/sales-festivals/page.jsx

import { getSalesFestivals } from '@/actions/admin/salesFestivals'
import SalesFestivalsList from '@/components/admin/salesFestivals/SalesFestivalList'

export default async function SalesFestivalsPage() {
  const festivals = await getSalesFestivals()

  return (
    <div>
      <h1>مدیریت جشنواره‌ها</h1>
      <SalesFestivalsList festivals={festivals} />
    </div>
  )
}
