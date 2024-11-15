import prisma from '@/db/client'
import SalesFestivalList from '@/components/admin/salesFestivals/SalesFestivalList'

export default async function SalesFestivalsPage() {
  const festivals = await prisma.salesFestival.findMany({
    include: { salesConditions: true },
    orderBy: { updatedAt: 'desc' },
  })

  return (
    <div>
      <h1>مدیریت جشنواره‌ها</h1>
      <SalesFestivalList festivals={festivals} />
    </div>
  )
}
