import prisma from '@/db/client'
import SalesFestivalForm from '@/components/admin/salesFestivals/SalesFestivalForm'

export default async function EditSalesFestivalPage({ params }) {
  const { id } = params

  // اگر id برابر با "create" باشد، فرم ایجاد جشنواره را نمایش می‌دهیم
  if (id === 'create') {
    const salesConditions = await prisma.salesCondition.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return (
      <div>
        <h1>ایجاد جشنواره جدید</h1>
        <SalesFestivalForm salesConditions={salesConditions} />
      </div>
    )
  }

  // اگر id برابر با "create" نبود، فرض می‌کنیم که id یک شناسه معتبر است
  const festival = await prisma.salesFestival.findUnique({
    where: { id },
    include: { salesConditions: true },
  })

  if (!festival) {
    return <div>جشنواره مورد نظر یافت نشد.</div>
  }

  const salesConditions = await prisma.salesCondition.findMany({
    include: { car: true }, // دریافت اطلاعات خودرو برای هر شرایط فروش
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1>ویرایش جشنواره</h1>
      <SalesFestivalForm festival={festival} salesConditions={salesConditions} />
    </div>
  )
}
