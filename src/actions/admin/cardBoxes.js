// src/actions/admin/cardBoxes.js

'use server'

import { prisma } from '@/db/client'
import { revalidatePath } from 'next/cache'
import * as z from 'zod'

// اسکیما برای اعتبارسنجی فرم‌ها با استفاده از zod
export const cardBoxSchema = z.object({
  title: z.string().nonempty('عنوان کارت باکس الزامی است'),
  subtitle: z.string().optional(),
  description: z.string().nonempty('توضیحات الزامی است'),
  carId: z.string().nonempty('انتخاب خودرو الزامی است'),
  sectionId: z.string().nonempty('انتخاب بخش الزامی است'),
})

// ایجاد کارت باکس جدید
export async function createCardBox(formData) {
  const data = cardBoxSchema.parse(formData)
  await prisma.cardBox.create({
    data: {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      carId: data.carId,
      sectionId: data.sectionId,
    },
  })
  revalidatePath('/admin/card-boxes')
}

// ویرایش کارت باکس
export async function updateCardBox(id, formData) {
  const data = cardBoxSchema.parse(formData)
  await prisma.cardBox.update({
    where: { id },
    data: {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      carId: data.carId,
      sectionId: data.sectionId,
    },
  })
  revalidatePath('/admin/card-boxes')
}

// حذف کارت باکس
export async function deleteCardBox(id) {
  await prisma.cardBox.delete({
    where: { id },
  })
  revalidatePath('/admin/card-boxes')
}

// سرور اکشن برای دریافت لیست خودروهای فعال
export async function getActiveCars() {
  const cars = await prisma.car.findMany({
    where: { isActive: true },
    select: { id: true, name: true },
  })
  return cars
}

// سرور اکشن برای دریافت لیست بخش‌های کارت باکس
export async function getCardBoxSections() {
  const sections = await prisma.cardBoxSection.findMany({
    select: { id: true, name: true },
  })
  return sections
}
