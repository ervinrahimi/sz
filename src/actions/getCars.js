'use server';

// سرور اکشنی برای دریافت لیست خودروها
import prisma from '@/db/client';

export async function getCars() {
  // دریافت لیست خودروها از دیتابیس
  const cars = await prisma.car.findMany({
    include: {
      images: true,
    },
  });
  return cars;
}
