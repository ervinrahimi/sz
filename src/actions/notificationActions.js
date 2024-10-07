'use server';

// اکشن برای دریافت اعلان‌های کاربر
import prisma from '@/db/client';

export async function getUserNotifications(userId) {
  const notifications = await prisma.notification.findMany({
    where: { userId, isRead: false },
    orderBy: { createdAt: 'desc' },
  });
  return notifications;
}

// اکشن برای علامت‌گذاری اعلان به عنوان خوانده‌شده
export async function markAsRead(notificationId) {
  try {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
