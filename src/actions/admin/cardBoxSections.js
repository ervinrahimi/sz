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
  await prisma.cardBoxSection.create({
    data: {
      name: data.name,
      subtitle: data.subtitle,
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
