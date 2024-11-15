'use server'

import prisma from '@/db/client'

// ایجاد جشنواره جدید
export async function createSalesFestival(data) {
  const { name, description, startDate, endDate, salesConditionIds } = data

  return await prisma.salesFestival.create({
    data: {
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      salesConditions: {
        connect: salesConditionIds.map((id) => ({ id })),
      },
    },
  })
}

// ویرایش جشنواره
export async function updateSalesFestival(id, data) {
  const { name, description, startDate, endDate, salesConditionIds } = data

  return await prisma.salesFestival.update({
    where: { id },
    data: {
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      salesConditions: {
        set: [],
        connect: salesConditionIds.map((id) => ({ id })),
      },
    },
  })
}

// حذف جشنواره
export async function deleteSalesFestival(id) {
  return await prisma.salesFestival.delete({
    where: { id },
  })
}
