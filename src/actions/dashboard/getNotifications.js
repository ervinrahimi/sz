'use server'

import { auth } from '@/security/auth'
import prisma from '@/db/client'

// گرفتن تمام پیام‌ها
export async function getNotifications() {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return { success: false, message: 'کاربر وارد نشده است.' }
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: user.id },
    })

    return { success: true, notifications }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'خطا در دریافت اطلاعیه‌ها.' }
  }
}

// دریافت یک پیام خاص با id
export async function getNotificationById(notificationId) {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return { success: false, message: 'کاربر وارد نشده است.' }
  }

  try {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    })

    if (!notification || notification.userId !== user.id) {
      return { success: false, message: 'پیام یافت نشد.' }
    }

    return { success: true, notification }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'خطا در دریافت پیام.' }
  }
}

// تغییر وضعیت پیام به "خوانده شده"
export async function markAsRead(notificationId) {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return { success: false, message: 'کاربر وارد نشده است.' }
  }

  try {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    })

    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'خطا در به‌روزرسانی وضعیت پیام.' }
  }
}
