'use server'

// اکشن برای دریافت اطلاعات کاربر
import prisma from '@/db/client'
import bcrypt from 'bcryptjs'

export async function getUserInfo(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      family: true,
      email: true,
      phone: true,
    },
  })
  return user
}

// اکشن برای به‌روزرسانی اطلاعات کاربر
export async function updateUserInfo(userId, userInfo) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        name: userInfo.name,
        family: userInfo.family,
        email: userInfo.email,
        phone: userInfo.phone,
      },
    })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

// اکشن برای تغییر رمز عبور
export async function changePassword(userId, passwordData) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    // بررسی صحت رمز عبور فعلی
    const isMatch = await bcrypt.compare(passwordData.currentPassword, user.password)
    if (!isMatch) {
      return false
    }

    // هش کردن رمز عبور جدید
    const hashedPassword = await bcrypt.hash(passwordData.newPassword, 10)

    // به‌روزرسانی رمز عبور
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    })

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
