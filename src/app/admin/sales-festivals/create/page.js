// src/app/admin/sales-festivals/create/page.jsx

import { getSalesConditions } from '@/actions/admin/salesFestivals'
import SalesFestivalForm from '@/components/admin/salesFestivals/SalesFestivalForm'

export default async function CreateSalesFestivalPage() {
  const salesConditions = await getSalesConditions()

  return (
    <div>
      <h1>ایجاد جشنواره جدید</h1>
      <SalesFestivalForm salesConditions={salesConditions} />
    </div>
  )
}
