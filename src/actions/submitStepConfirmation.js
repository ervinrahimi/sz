'use server';

// اکشنی برای ثبت تاییدیه مرحله پنجم
import prisma from '@/db/client';

export async function submitStepConfirmation(orderId, stepNumber) {
  try {
    await prisma.orderStep.create({
      data: {
        orderId,
        stepNumber,
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
