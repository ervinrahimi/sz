'use server'

import { auth } from '@/security/auth'
import prisma from '@/db/client'

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
