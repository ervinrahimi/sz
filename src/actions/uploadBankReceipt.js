'use server';

// اکشنی برای آپلود فیش واریزی
import prisma from '@/db/client';
import { uploadFileToServer } from '@/utils/fileUpload';

export async function uploadBankReceipt(orderId, stepNumber, file) {
  try {
    const filePath = await uploadFileToServer(file, orderId, 'فیش واریزی');

    // ذخیره اطلاعات فایل در دیتابیس
    await prisma.uploadedFile.create({
      data: {
        orderId,
        userId: /* شناسه کاربر */,
        step: stepNumber,
        fileType: 'فیش واریزی',
        filePath,
      },
    });

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
