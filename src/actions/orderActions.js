'use server';

// اکشن برای دریافت سفارشات کاربر
import prisma from '@/db/client';

export async function getUserOrders(userId) {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      car: true,
      saleCondition: true,
    },
  });
  return orders;
}
