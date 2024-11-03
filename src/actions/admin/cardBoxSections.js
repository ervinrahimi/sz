// src/actions/admin/cardBoxSections.js

'use server'

import prisma from '@/db/client'
import { cardBoxSectionSchema } from '@/security/zod/validationSchema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as z from 'zod'

// ایجاد بخش جدید
export async function createCardBoxSection(formData) {
  const data = cardBoxSectionSchema.parse(formData)

  // پیدا کردن بالاترین مقدار order در بخش‌های موجود
  const maxOrderSection = await prisma.cardBoxSection.findFirst({
    orderBy: { order: 'desc' },
  })
  const newOrder = maxOrderSection ? maxOrderSection.order + 1 : 1

  await prisma.cardBoxSection.create({
    data: {
      name: data.name,
      subtitle: data.subtitle,
      order: newOrder, // تنظیم مقدار order برای بخش جدید
    },
  })

  revalidatePath('/admin/card-box-sections')
}

// ویرایش بخش
export async function updateCardBoxSection(id, formData) {
  const data = cardBoxSectionSchema.parse(formData)
  await prisma.cardBoxSection.update({
    where: { id },
    data: {
      name: data.name,
      subtitle: data.subtitle,
    },
  })
  revalidatePath('/admin/card-box-sections')
}

// حذف بخش
export async function deleteCardBoxSection(id) {
  await prisma.cardBoxSection.delete({
    where: { id },
  })
  revalidatePath('/admin/card-box-sections')
}

// سرور اکشن برای بالا بردن ترتیب
export async function moveSectionUp(sectionId) {
  const section = await prisma.cardBoxSection.findUnique({ where: { id: sectionId } })

  if (!section) throw new Error('بخش مورد نظر یافت نشد')

  const higherSection = await prisma.cardBoxSection.findFirst({
    where: { order: { lt: section.order } },
    orderBy: { order: 'desc' },
  })

  if (!higherSection) return // اگر بخش بالاتری نباشد، خروج کنید

  await prisma.$transaction([
    prisma.cardBoxSection.update({
      where: { id: section.id },
      data: { order: higherSection.order },
    }),
    prisma.cardBoxSection.update({
      where: { id: higherSection.id },
      data: { order: section.order },
    }),
  ])

  // بازسازی صفحه پس از تغییر ترتیب
  revalidatePath('/admin/card-box-sections')
}

// سرور اکشن برای پایین بردن ترتیب
export async function moveSectionDown(sectionId) {
  const section = await prisma.cardBoxSection.findUnique({ where: { id: sectionId } })

  if (!section) throw new Error('بخش مورد نظر یافت نشد')

  const lowerSection = await prisma.cardBoxSection.findFirst({
    where: { order: { gt: section.order } },
    orderBy: { order: 'asc' },
  })

  if (!lowerSection) return // اگر بخش پایینی نباشد، خروج کنید

  await prisma.$transaction([
    prisma.cardBoxSection.update({
      where: { id: section.id },
      data: { order: lowerSection.order },
    }),
    prisma.cardBoxSection.update({
      where: { id: lowerSection.id },
      data: { order: section.order },
    }),
  ])

  // بازسازی صفحه پس از تغییر ترتیب
  revalidatePath('/admin/card-box-sections')
}
