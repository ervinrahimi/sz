'use server'

import prisma from '@/db/client'

/**
 * دریافت جشنواره بر اساس شناسه
 */
export async function getSalesFestivalById(id) {
  try {
    return await prisma.salesFestival.findUnique({
      where: { id },
      include: {
        salesConditions: {
          include: {
            car: true,
          },
        },
      },
    })
  } catch (error) {
    throw new Error('خطا در دریافت اطلاعات جشنواره')
  }
}

/**
 * دریافت لیست شرایط فروش
 */
export async function getSalesConditions() {
  try {
    return await prisma.salesCondition.findMany({
      include: {
        car: true, // دریافت اطلاعات ماشین
      },
    })
  } catch (error) {
    throw new Error('خطا در دریافت لیست شرایط فروش')
  }
}

/**
 * ایجاد جشنواره جدید
 */
export async function createSalesFestival(data) {
  const { name, description, startDate, endDate, salesCondition } = data
  if (!salesCondition) {
    throw new Error('هیچ شرایط فروشی انتخاب نشده است.')
  }

  try {
    return await prisma.salesFestival.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        salesConditions: {
          connect: [{ id: salesCondition }],
        },
      },
    })
  } catch (error) {
    throw new Error('ایجاد جشنواره با مشکل مواجه شد.')
  }
}

/**
 * به‌روزرسانی جشنواره
 */
export async function updateSalesFestival(id, data) {
  const { name, description, startDate, endDate, salesCondition } = data

  try {
    return await prisma.salesFestival.update({
      where: { id },
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        salesConditions: {
          set: [{ id: salesCondition }],
        },
      },
    })
  } catch (error) {
    throw new Error('ویرایش جشنواره با مشکل مواجه شد.')
  }
}

/**
 * حذف جشنواره
 */
export async function deleteSalesFestival(id) {
  try {
    return await prisma.salesFestival.delete({
      where: { id },
    })
  } catch (error) {
    throw new Error('حذف جشنواره با مشکل مواجه شد.')
  }
}

/**
 * دریافت لیست جشنواره‌ها
 */
export async function getSalesFestivals() {
  try {
    return await prisma.salesFestival.findMany({
      include: {
        salesConditions: {
          include: {
            car: true,
          },
        },
      },
    })
  } catch (error) {
    throw new Error('خطا در دریافت لیست جشنواره‌ها')
  }
}
