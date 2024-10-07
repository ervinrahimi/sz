'use server';

// اکشنی برای ذخیره اطلاعات مرحله اول
import prisma from '@/db/client';

export async function submitStep1(orderId, formData) {
  try {
    // ایجاد مرحله جدید در سفارش
    await prisma.orderStep.create({
      data: {
        orderId,
        stepNumber: 1,
        status: 'در حال بررسی',
        data: formData,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
