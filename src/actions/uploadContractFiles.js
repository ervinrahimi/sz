'use server';

// اکشنی برای آپلود فایل‌های مرحله هفتم
import prisma from '@/db/client';
import { uploadFileToServer } from '@/utils/fileUpload';

export async function uploadContractFiles(orderId, stepNumber, files) {
  try {
    for (const file of files) {
      const filePath = await uploadFileToServer(file, orderId, 'مدارک قرارداد');

      // ذخیره اطلاعات فایل در دیتابیس
      await prisma.uploadedFile.create({
        data: {
          orderId,
          userId: /* شناسه کاربر */,
          step: stepNumber,
          fileType: 'مدارک قرارداد',
          filePath,
        },
      });
    }

    // ایجاد مرحله جدید
    await prisma.orderStep.create({
      data: {
        orderId,
        stepNumber,
        status: 'در انتظار تایید',
        data: {},
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
