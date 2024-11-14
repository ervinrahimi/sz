// src/actions/admin/vehicles.js

'use server'

import prisma from '@/db/client'

// ایجاد خودرو جدید
export async function createVehicle(data) {
  const { model, name, imageFiles, status, appearanceSpecifications, technicalSpecifications } =
    data

  // ایجاد خودرو جدید با مشخصات ظاهری و فنی
  const newVehicle = await prisma.car.create({
    data: {
      model,
      name,
      image: imageFiles, // ذخیره URLهای تصاویر
      status,
      appearanceSpecifications: {
        create: appearanceSpecifications.map((spec) => ({
          title: spec.title,
          value: spec.value || '', // مقدار انتخاب‌شده توسط کاربر
          note: spec.note || '', // یادداشت اختیاری
        })),
      },
      technicalSpecifications: {
        create: technicalSpecifications.map((spec) => ({
          key: spec.key,
          value: spec.value,
          note: spec.note,
        })),
      },
    },
  })

  return { success: true, data: newVehicle }
}

// ویرایش خودرو
export async function updateVehicle(data) {
  const { id, model, name, image, status, appearanceSpecifications, technicalSpecifications } = data

  // به‌روزرسانی خودرو با حذف مشخصات قبلی و افزودن مشخصات جدید
  const updatedVehicle = await prisma.car.update({
    where: { id },
    data: {
      model,
      name,
      image, // ذخیره URLهای تصاویر به‌روزرسانی‌شده
      status,
      appearanceSpecifications: {
        deleteMany: {}, // حذف تمامی مشخصات ظاهری قبلی
        create: appearanceSpecifications.map((spec) => ({
          title: spec.title,
          value: spec.value || '', // مقدار انتخاب‌شده توسط کاربر
          note: spec.note || '', // یادداشت اختیاری
        })),
      },
      technicalSpecifications: {
        deleteMany: {}, // حذف تمامی مشخصات فنی قبلی
        create: technicalSpecifications.map((spec) => ({
          key: spec.key,
          value: spec.value,
          note: spec.note,
        })),
      },
    },
  })

  return { success: true, data: updatedVehicle }
}

export async function toggleCarStatus(carId) {
  const car = await prisma.car.findUnique({
    where: { id: carId },
  })

  if (car) {
    const newStatus = car.status === 'AVAILABLE' ? 'DEACTIVATED' : 'AVAILABLE'
    await prisma.car.update({
      where: { id: carId },
      data: { status: newStatus },
    })
  }
}
