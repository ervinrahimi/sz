'use server';

// اکشنی برای آپلود فایل‌ها
import prisma from '@/db/client';
import { uploadFileToServer } from '@/utils/fileUpload';

export async function uploadFiles(orderId, stepNumber, files, userId) {
  try {
    for (const fileData of files) {
      const filePath = await uploadFileToServer(fileData.file, orderId, fileData.fileType);

      // ذخیره اطلاعات فایل در دیتابیس
      await prisma.uploadedFile.create({
        data: {
          orderId,
          userId: userId,
          step: stepNumber,
          fileType: fileData.fileType,
          filePath,
        },
      });
    }

    // ایجاد مرحله جدید در سفارش
    await prisma.orderStep.create({
      data: {
        orderId,
        stepNumber,
        status: 'در حال بررسی',
        data: {},
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
