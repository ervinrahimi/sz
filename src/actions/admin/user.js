// src/app/admin/users/actions.js

'use server'

import prisma from '@/db/client'

export async function updateUser(data) {
  const { id, name, family, email, phone, nationalCode, role } = data
  // به‌روزرسانی کاربر در دیتابیس
  await prisma.user.update({
    where: { id },
    data: {
      name,
      family,
      email,
      phone,
      role,
    },
  })
}

export async function createUser(data) {
  const { name, family, email, phone, password, nationalCode, role } = data

  // بررسی وجود ایمیل تکراری
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw new Error('کاربر با این ایمیل قبلاً ثبت شده است.')
  }

  // ایجاد کاربر جدید
  const user = await prisma.user.create({
    data: {
      name,
      family,
      email,
      phone,
      nationalCode,
      password, // توجه: رمز باید هش شود
      role: parseInt(role) || 0,
      emailVerified: new Date(),
    },
  })

  return user
}

// تابع حذف کاربر
export async function deleteUser(userId) {
  // حذف کاربر از دیتابیس
  await prisma.user.delete({
    where: { id: userId },
  })
}
