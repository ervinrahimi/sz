'use server';

// سرور اکشنی برای دریافت جزئیات یک خودرو
import prisma from '@/db/client';

export async function getCarDetails(carId) {
  const car = await prisma.car.findUnique({
    where: { id: carId },
    include: {
      specifications: true,
      appearances: true,
      saleConditions: {
        include: {
          authorizedUsers: true,
        },
      },
    },
  });
  return car;
}
