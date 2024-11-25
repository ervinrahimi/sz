// src/app/admin/vehicles/[id]/page.jsx

import prisma from '@/db/client'
import VehicleDetails from '@/components/admin/vehicles/VehicleDetails'
import styles from '../../page.module.css'

export default async function VehicleDetailsPage({ params }) {
  const vehicleId = params.id
  const vehicle = await prisma.car.findUnique({
    where: { id: vehicleId },
    include: {
      appearanceSpecifications: true,
      technicalSpecifications: true,
      comfortFeatures: true,
      safetyFeatures: true,
      salesConditions: true,
    },
  })

  if (!vehicle) {
    return <div className={styles.notFound}>خودرو یافت نشد</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>جزئیات خودرو</h1>
        </div>
        <div className={styles.balanceBox}>
          <VehicleDetails vehicle={vehicle} />
        </div>
      </div>
    </div>
  )
}
