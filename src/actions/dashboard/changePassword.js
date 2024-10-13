'use server'

import { auth } from '@/security/auth'
import prisma from '@/db/client'
import bcrypt from 'bcrypt'

export async function changePassword({ currentPassword, newPassword }) {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return { success: false, message: 'کاربر وارد نشده است.' }
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
    })

    const isPasswordValid = await bcrypt.compare(currentPassword, existingUser.password)
    if (!isPasswordValid) {
      return { success: false, message: 'رمز عبور فعلی نادرست است.' }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'خطا در تغییر رمز عبور.' }
  }
}
