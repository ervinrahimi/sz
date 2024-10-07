'use server';

// اکشنی برای ثبت تاییدیه شرایط
import prisma from '@/db/client';

export async function submitStepAgreement(orderId) {
  try {
    // ایجاد مرحله جدید در سفارش
    await prisma.orderStep.create({
      data: {
        orderId,
        stepNumber: 3,
        status: 'تکمیل شده',
        data: {},
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
