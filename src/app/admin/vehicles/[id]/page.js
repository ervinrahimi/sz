// src/app/admin/vehicles/[id]/page.jsx

import prisma from '@/db/client'
import VehicleDetails from '@/components/admin/vehicles/VehicleDetails'
import styles from './page.module.css'

export default async function VehicleDetailsPage({ params }) {
  const vehicleId = params.id
  const vehicle = await prisma.car.findUnique({
    where: { id: vehicleId },
    include: {
      appearanceSpecifications: true,
      technicalSpecifications: true,
      salesConditions: true,
    },
  })

  if (!vehicle) {
    return <div className={styles.notFound}>خودرو یافت نشد</div>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>جزئیات خودرو</h1>
      <VehicleDetails vehicle={vehicle} />
    </div>
  )
}
