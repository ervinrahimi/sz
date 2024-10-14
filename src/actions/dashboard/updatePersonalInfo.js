'use server'

import { auth } from '@/security/auth'
import prisma from '@/db/client'

export async function updatePersonalInfo(data) {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return { success: false, message: 'کاربر وارد نشده است.' }
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        family: data.family,
        email: data.email,
        phone: data.phone,
      },
    })
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'خطا در به‌روزرسانی اطلاعات.' }
  }
}
