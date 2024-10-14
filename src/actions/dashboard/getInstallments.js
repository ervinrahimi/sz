'use server'

import { auth } from '@/security/auth'
import prisma from '@/db/client'

export async function getInstallments() {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return { success: false, message: 'کاربر وارد نشده است.' }
  }

  try {
    const installments = await prisma.installment.findMany({
      where: { order: { userId: user.id } },
    })

    return { success: true, installments }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'خطا در دریافت اقساط.' }
  }
}

export async function uploadReceipt(installmentId, file) {
  try {
    // ذخیره فایل و به‌روزرسانی دیتابیس
    return { success: true }
  } catch (error) {
    return { success: false, message: 'خطا در آپلود رسید.' }
  }
}
