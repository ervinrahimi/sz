import prisma from '@/db/client'
import SalesFestivalForm from '@/components/admin/salesFestivals/SalesFestivalForm'

export default async function CreateSalesFestivalPage() {
  const salesConditions = await prisma.salesCondition.findMany({
    include: { car: true }, // دریافت اطلاعات خودرو برای هر شرایط فروش
    orderBy: { createdAt: 'desc' },
  })
  

  return (
    <div>
      <h1>ایجاد جشنواره جدید</h1>
      <SalesFestivalForm salesConditions={salesConditions} />
    </div>
  )
}
