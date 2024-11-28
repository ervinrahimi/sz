'use server'

import prisma from '@/db/client'
import { deleteFileFromServer } from '@/utils/fileUtils'
import { revalidatePath } from 'next/cache'

// حذف فایل کاتالوگ در دیتابیس و سرور
export async function deleteCatalogFile(id) {
  const cardBox = await prisma.cardBox.findUnique({ where: { id } })
  if (cardBox && cardBox.catalogUrl) {
    await deleteFileFromServer(cardBox.catalogUrl)
    await prisma.cardBox.update({
      where: { id },
      data: { catalogUrl: null },
    })
  }
}

export async function createCardBox(data) {
  await prisma.cardBox.create({
    data: {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      price: data.price,
      carId: data.carId,
      sectionId: data.sectionId,
      viewLink: '/cars/' + data.carId,
      imageUrl: data.imageUrl,
      catalogUrl: data.catalogUrl,
    },
  })

  revalidatePath('/admin/card-boxes')
}

export async function updateCardBox(id, data) {
  const cardBox = await prisma.cardBox.findUnique({ where: { id } })

  // حذف تصویر قدیمی در صورت تغییر
  if (data.imageUrl !== cardBox.imageUrl) {
    if (cardBox.imageUrl) {
      await deleteFileFromServer(cardBox.imageUrl)
    }
  }

  // حذف کاتالوگ قدیمی در صورت تغییر
  if (data.catalogUrl !== cardBox.catalogUrl) {
    if (cardBox.catalogUrl) {
      await deleteFileFromServer(cardBox.catalogUrl)
    }
  }

  await prisma.cardBox.update({
    where: { id },
    data: {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      price: data.price,
      carId: data.carId,
      sectionId: data.sectionId,
      viewLink: '/cars/' + data.carId,
      imageUrl: data.imageUrl,
      catalogUrl: data.catalogUrl,
    },
  })

  revalidatePath('/admin/card-boxes')
}

export async function deleteImageFile(cardBoxId) {
  const cardBox = await prisma.cardBox.findUnique({ where: { id: cardBoxId } })

  if (cardBox && cardBox.imageUrl) {
    await deleteFileFromServer(cardBox.imageUrl)

    await prisma.cardBox.update({
      where: { id: cardBoxId },
      data: {
        imageUrl: null,
      },
    })
  }

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
