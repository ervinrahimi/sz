// src/actions/admin/vehicles.js

'use server'

import prisma from '@/db/client'

// ایجاد خودرو جدید
export async function createVehicle(data) {
  const { model, name, imageFile, status, appearanceSpecifications, technicalSpecifications } = data
  const newVehicle = await prisma.car.create({
    data: {
      model,
      name,
      image: imageFile,
      status,
      appearanceSpecifications: {
        create: appearanceSpecifications.map((spec) => ({
          title: spec.title,
          options: spec.options,
          isSelectable: spec.isSelectable
        }))
      },
      technicalSpecifications: {
        create: technicalSpecifications.map((spec) => ({
          key: spec.key,
          value: spec.value,
          note: spec.note
        }))
      }
    }
  })
  return {success: true, data: newVehicle}
}

// ویرایش خودرو
export async function updateVehicle(data) {
  const { id, model, name, image, status, appearanceSpecifications, technicalSpecifications } = data
  const updatedVehicle = await prisma.car.update({
    where: { id },
    data: {
      model,
      name,
      image,
      status,
      appearanceSpecifications: {
        deleteMany: {}, // حذف مشخصات قبلی
        create: appearanceSpecifications.map((spec) => ({
          title: spec.title,
          options: spec.options,
          isSelectable: spec.isSelectable
        }))
      },
      technicalSpecifications: {
        deleteMany: {}, // حذف مشخصات قبلی
        create: technicalSpecifications.map((spec) => ({
          key: spec.key,
          value: spec.value,
          note: spec.note
        }))
      }
    }
  })
  
  return {success: true, data: updatedVehicle}
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
