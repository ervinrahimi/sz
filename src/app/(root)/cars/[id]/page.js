import ProductDetail from '@/components/ui/Products/ProductDetail'
import prisma from '@/db/client'

export default async function CarPage({ params }) {
  const carId = params.id

  // واکشی داده‌های خودرو از پایگاه داده، شامل جشنواره‌ها
  const car = await prisma.car.findUnique({
    where: { id: carId },
    include: {
      technicalSpecifications: true,
      appearanceSpecifications: true,
      salesConditions: {
        include: {
          salesFestival: true, // اضافه کردن ارتباط جشنواره
        },
      },
    },
  })

  // واکشی داده‌های cardBoxSections از پایگاه داده
  const cardBoxSections = await prisma.cardBoxSection.findMany({
    include: {
      cardBoxes: {
        include: {
          car: true,
        },
      },
    },
    orderBy: { order: 'asc' },
  })

  return <ProductDetail car={car} cardBoxSections={cardBoxSections} />
}
