// src/app/admin/sales-conditions/actions.js

'use server'

import prisma from '@/db/client'

// اکشن برای ایجاد شرایط فروش
export async function createSalesCondition(data) {
  const { carId, name, conditionType, salesMethod, paymentType, price, finalPrice, isLocked } = data

  return await prisma.salesCondition.create({
    data: {
      carId,
      name,
      conditionType,
      salesMethod,
      paymentType,
      price: parseInt(price),
      finalPrice: parseInt(finalPrice), // ذخیره قیمت نهایی
      isLocked,
    },
  })
}

// اکشن برای ویرایش شرایط فروش
export async function updateSalesCondition(data) {
  const { id, name, conditionType, salesMethod, paymentType, price, finalPrice, isLocked } = data

  return await prisma.salesCondition.update({
    where: { id },
    data: {
      name,
      conditionType,
      salesMethod,
      paymentType,
      price,
      finalPrice, // اضافه کردن قیمت نهایی
      isLocked,
    },
  })
}

// اکشن برای افزودن کاربران مجاز به یک شرایط فروش
export async function addAuthorizedUser(salesConditionId, user) {
  const { nationalCode, name, family } = user

  return await prisma.authorizedUser.create({
    data: {
      salesConditionId,
      nationalCode,
      name,
      family,
    },
  })
}

// سرور اکشن برای حذف کاربر از لیست دارای مجوز
export async function removeAuthorizedUser(userId) {
  return await prisma.authorizedUser.delete({
    where: { id: userId },
  })
}
