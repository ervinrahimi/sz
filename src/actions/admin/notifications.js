// src/app/admin/notifications/actions.js

'use server'

import prisma from '@/db/client'

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
