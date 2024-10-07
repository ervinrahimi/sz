'use server';

// اکشنی برای دریافت یا ایجاد سفارش
import prisma from '@/db/client';

export async function getOrder(carId, conditionId, userId) {
  // بررسی وجود سفارش برای کاربر و این خودرو
  let order = await prisma.order.findFirst({
    where: {
      carId,
      saleConditionId: conditionId,
      userId,
    },
    include: {
      steps: true,
      appearanceSelections: true,
    },
  });

  if (!order) {
    // ایجاد سفارش جدید
    order = await prisma.order.create({
      data: {
        carId,
        saleConditionId: conditionId,
        userId,
        // سایر داده‌های اولیه
      },
      include: {
        steps: true,
        appearanceSelections: true,
      },
    });
  }

  return order;
}
