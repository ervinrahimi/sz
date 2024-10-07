'use server';

// اکشنی برای آپلود رسیدهای پرداخت
import prisma from '@/db/client';
import { uploadFileToServer } from '@/utils/fileUpload';

export async function uploadPaymentReceipts(orderId, stepNumber, files, userId) {
  try {
    for (const file of files) {
      const filePath = await uploadFileToServer(file, orderId, 'رسید پرداخت');

      // ذخیره اطلاعات فایل در دیتابیس
      await prisma.uploadedFile.create({
        data: {
          orderId,
          userId: userId,
          step: stepNumber,
          fileType: 'رسید پرداخت',
          filePath,
        },
      });
    }

    // بررسی تکمیل پرداخت‌ها
    // اگر مبلغ کامل پرداخت شده باشد، ایجاد مرحله جدید
    const totalPaid = await calculateTotalPaid(orderId);
    if (totalPaid >= order.saleCondition.registrationPayment) {
      await prisma.orderStep.create({
        data: {
          orderId,
          stepNumber,
          status: 'در انتظار تایید',
          data: {},
        },
      });
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// تابع برای محاسبه مجموع مبالغ پرداخت‌شده
async function calculateTotalPaid(orderId) {
  // محاسبه مجموع مبالغ از فایل‌های آپلود شده
  // در اینجا باید از اطلاعات فایل‌ها یا دیتابیس استفاده کنید
  // به عنوان مثال:
  const payments = await prisma.uploadedFile.findMany({
    where: {
      orderId,
      fileType: 'رسید پرداخت',
    },
  });

  let total = 0;
  for (const payment of payments) {
    // فرض می‌کنیم مبلغ پرداخت در نام فایل یا دیتای فایل ذخیره شده است
    // این قسمت نیاز به پیاده‌سازی دقیق‌تری دارد
  }

  return total;
}
