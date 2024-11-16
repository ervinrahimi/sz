// src/app/admin/sales-festivals/edit/[id]/page.jsx

import { getSalesConditions, getSalesFestivalById } from '@/actions/admin/salesFestivals'
import SalesFestivalForm from '@/components/admin/salesFestivals/SalesFestivalForm'

export default async function EditSalesFestivalPage({ params }) {
  const { id } = params
  const festival = await getSalesFestivalById(id)
  const salesConditions = await getSalesConditions()

  if (!festival) {
    return <div>جشنواره یافت نشد</div>
  }

  return (
    <div>
      <h1>ویرایش جشنواره</h1>
      <SalesFestivalForm festival={festival} salesConditions={salesConditions} />
    </div>
  )
}
