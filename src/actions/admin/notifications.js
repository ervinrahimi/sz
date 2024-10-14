// src/app/admin/notifications/actions.js

'use server'

import prisma from '@/db/client'

// اکشن برای جستجوی کاربران بر اساس نام یا فامیل
export async function searchUsersByName(query) {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } }, // جستجو بر اساس نام
        { family: { contains: query, mode: 'insensitive' } }, // جستجو بر اساس نام خانوادگی
      ],
    },
    select: {
      id: true,
      name: true,
      family: true,
      email: true,
    },
    take: 10, // حداکثر 10 نتیجه
  })
  return users
}

// اکشن برای ارسال نوتیفیکیشن
export async function sendNotification(data) {
  const { userId, title, message } = data
  await prisma.notification.create({
    data: {
      userId,
      title,
      message,
    },
  })
}
