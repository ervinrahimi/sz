// src/actions/admin/cardBoxes.js

'use server'

import fs from 'fs'
import path from 'path'
import prisma from '@/db/client'
import { v4 as uuidv4 } from 'uuid'
import { cardBoxSchema } from '@/security/zod/validationSchema'
import { revalidatePath } from 'next/cache'

// تنظیم پوشه ذخیره‌سازی فایل‌های کاتالوگ
const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'catalogs')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// تابع کمکی برای تبدیل `FormData` به آبجکت
function formDataToObject(formData) {
  const obj = {}
  formData.forEach((value, key) => {
    obj[key] = key === 'price' ? Number(value) : value // تبدیل `price` به عدد
  })
  return obj
}

// ذخیره فایل کاتالوگ در سرور
async function saveCatalogFile(file) {
  const fileExtension = path.extname(file.name)
  const uniqueFileName = `${uuidv4()}${fileExtension}`
  const filePath = path.join(uploadDir, uniqueFileName)

  const buffer = await file.arrayBuffer()
  fs.writeFileSync(filePath, Buffer.from(buffer))

  return `/uploads/catalogs/${uniqueFileName}`
}

// حذف فایل از سرور
async function deleteFileFromServer(filePath) {
  const absolutePath = path.join(process.cwd(), 'public', filePath)
  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath)
  }
}

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

// ایجاد کارت باکس با فایل کاتالوگ
export async function createCardBox(formData) {
  const dataObject = formDataToObject(formData)

  // اعتبارسنجی با Zod
  const data = cardBoxSchema.parse({
    ...dataObject,
    catalogFile: formData.get('catalogFile'), // افزودن فایل به داده‌های اعتبارسنجی
  })

  let catalogUrl
  if (data.catalogFile) {
    catalogUrl = await saveCatalogFile(data.catalogFile)
  }

  await prisma.cardBox.create({
    data: {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      price: data.price,
      carId: data.carId,
      sectionId: data.sectionId,
      viewLink: '/cars/' + data.carId,
      catalogUrl,
    },
  })

  revalidatePath('/admin/card-boxes')
}

// ویرایش کارت باکس و جایگزینی فایل در صورت نیاز
export async function updateCardBox(id, formData) {
  const dataObject = formDataToObject(formData)

  // اعتبارسنجی با Zod
  const data = cardBoxSchema.parse({
    ...dataObject,
    catalogFile: formData.get('catalogFile'), // افزودن فایل به داده‌های اعتبارسنجی
  })

  let catalogUrl = data.catalogUrl
  if (data.catalogFile) {
    const cardBox = await prisma.cardBox.findUnique({ where: { id } })

    // حذف فایل قدیمی در صورت وجود
    if (cardBox && cardBox.catalogUrl) {
      await deleteFileFromServer(cardBox.catalogUrl)
    }

    // ذخیره فایل جدید
    catalogUrl = await saveCatalogFile(data.catalogFile)
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
      catalogUrl,
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
