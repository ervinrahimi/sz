// src/actions/admin/cardBoxes.js

'use server'

import prisma from '@/db/client'
import { cardBoxSchema } from '@/security/zod/validationSchema'
import { revalidatePath } from 'next/cache'

function formDataToObject(formData) {
  const obj = {}
  formData.forEach((value, key) => {
    obj[key] = value
  })
  return obj
}

export async function createCardBox(formData) {
  const dataObject = typeof formData === 'object' ? formData : formDataToObject(formData)

  const data = cardBoxSchema.parse(dataObject)
  await prisma.cardBox.create({
    data: {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      carId: data.carId,
      sectionId: data.sectionId,
      viewLink: data.viewLink,
    },
  })

  revalidatePath('/admin/card-boxes')
}

export async function updateCardBox(id, formData) {
  const dataObject = typeof formData === 'object' ? formData : formDataToObject(formData)

  const data = cardBoxSchema.parse(dataObject)
  await prisma.cardBox.update({
    where: { id },
    data: {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      carId: data.carId,
      sectionId: data.sectionId,
      viewLink: data.viewLink,
    },
  })

  revalidatePath('/admin/card-boxes')
}

export async function deleteCardBox(id) {
  await prisma.cardBox.delete({
    where: { id },
  })
  revalidatePath('/admin/card-boxes')
}

export async function getActiveCars() {
  const cars = await prisma.car.findMany({
    where: { isActive: true },
    select: { id: true, name: true },
  })
  return cars
}

export async function getCardBoxSections() {
  const sections = await prisma.cardBoxSection.findMany({
    select: { id: true, name: true },
  })
  return sections
}
