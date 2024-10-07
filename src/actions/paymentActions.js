'use server';

// اکشن برای دریافت پرداخت‌های کاربر
import prisma from '@/db/client';
import { uploadFileToServer } from '@/utils/fileUpload';

export async function getUserPayments(userId) {
  const payments = await prisma.payment.findMany({
    where: { userId },
    include: {
      order: {
        include: {
          car: true,
        },
      },
    },
  });
  return payments;
}

// اکشن برای آپلود رسید پرداخت
export async function uploadPaymentReceipt(orderId, userId, file) {
  try {
    const filePath = await uploadFileToServer(file, orderId, 'رسید پرداخت');

    // ایجاد رکورد پرداخت جدید با وضعیت در انتظار تأیید
    await prisma.payment.create({
      data: {
        userId,
        orderId,
        amount: /* مبلغ پرداخت شده، می‌تواند از اطلاعات فایل استخراج شود */,
        status: 'در انتظار تأیید',
        paymentType: 'اقساط',
        receiptPath: filePath,
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// ادامه فایل actions/paymentActions.js

// اکشن برای دریافت برنامه اقساط
export async function getInstallmentSchedule(userId) {
  // فرض می‌کنیم که اقساط در جدول خاصی ذخیره شده‌اند
  const installments = await prisma.installment.findMany({
    where: { userId },
    orderBy: { dueDate: 'asc' },
  });
  return installments;
}
