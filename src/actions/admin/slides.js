// src/actions/admin/slides.js

'use server'

import prisma from '@/db/client'
import { revalidatePath } from 'next/cache'

// ایجاد اسلاید جدید
export async function createSlide(data) {
  const count = await prisma.slide.count()
  if (count >= 5) {
    throw new Error('تعداد اسلایدها نمی‌تواند بیش از ۵ باشد.')
  }

  const { title, imageUrl, typeAnimation } = data // اضافه کردن typeAnimation به دیتا
  await prisma.slide.create({
    data: {
      title,
      imageUrl,
      typeAnimation, // ذخیره متون انیمیشن تایپ
      order: count + 1,
    },
  })
  revalidatePath('/admin/slides')
}

// ویرایش اسلاید
export async function updateSlide(data) {
  const { id, title, imageUrl, typeAnimation } = data // اضافه کردن typeAnimation به دیتا
  await prisma.slide.update({
    where: { id },
    data: {
      title,
      imageUrl,
      typeAnimation, // به‌روزرسانی متون انیمیشن تایپ
    },
  })
  revalidatePath('/admin/slides')
}

// حذف اسلاید
export async function deleteSlide(id) {
  await prisma.slide.delete({
    where: { id },
  })
  revalidatePath('/admin/slides')
}

// تغییر ترتیب اسلایدها
export async function reorderSlides(newOrder) {
  for (const { id, order } of newOrder) {
    await prisma.slide.update({
      where: { id },
      data: { order },
    })
  }
  revalidatePath('/admin/slides')
}

// دریافت تمامی اسلایدها
export async function getSlides() {
  const slides = await prisma.slide.findMany({
    orderBy: { order: 'asc' },
  })
  return slides // بازگرداندن اسلایدها به صورت مستقیم
}
