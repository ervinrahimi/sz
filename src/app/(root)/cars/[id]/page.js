import ProductDetail from '@/components/ui/Products/ProductDetail'
import prisma from '@/db/client'

export default async function CarPage({ params }) {
  const carId = params.id
  const car = await prisma.car.findUnique({
    where: { id: carId },
    include: {
      technicalSpecifications: true,
      appearanceSpecifications: true,
      salesConditions: true,
    },
  })

  return <ProductDetail car={car} />
}
