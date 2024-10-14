'use server'

import { prisma } from '@/db/client'

export async function updateOrderStatus(orderId, newStatus) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: newStatus,
      },
    })
    return {
      success: true,
      message: 'وضعیت سفارش با موفقیت تغییر کرد.',
    }
  } catch (error) {
    console.error('خطا در تغییر وضعیت سفارش:', error)
    return {
      success: false,
      message: 'خطا در تغییر وضعیت سفارش.',
    }
  }
}

export async function addAdminNote(orderId, note) {
  try {
    // پیدا کردن مرحله آخر سفارش و اضافه کردن یادداشت به آن
    const lastStep = await prisma.orderStep.findFirst({
      where: { orderId },
      orderBy: { stepNumber: 'desc' },
    })

    if (!lastStep) {
      throw new Error('هیچ مرحله‌ای یافت نشد.')
    }

    await prisma.orderStep.update({
      where: { id: lastStep.id },
      data: {
        adminNotes: note,
      },
    })

    return {
      success: true,
      message: 'یادداشت با موفقیت اضافه شد.',
    }
  } catch (error) {
    console.error('خطا در افزودن یادداشت:', error)
    return {
      success: false,
      message: 'خطا در افزودن یادداشت.',
    }
  }
}
